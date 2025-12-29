// Map State
let map = null;
let routes = [];
let personName = '';
let airportMarkers = [];
let routeLines = [];
let currentPersonRoutes = [];
let modalPinned = false; // Track if modal is pinned (clicked) or temporary (hovered)
let selectedRoute = null; // Track which route is currently selected (hoverPolyline reference)
let planeMarker = null; // Track the animated plane marker
let animationFrameId = null; // Track animation frame for cleanup

// Initialize Map
document.addEventListener('DOMContentLoaded', () => {
    // Get person name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    personName = urlParams.get('person');
    
    if (!personName) {
        // If no person parameter, redirect to main page
        window.location.href = 'index.html';
        return;
    }
    
    // Get routes for this person - check both window.flightRoutes and script.js global
    let allRoutes = {};
    if (typeof window.flightRoutes !== 'undefined') {
        allRoutes = window.flightRoutes;
    } else if (typeof flightRoutes !== 'undefined') {
        allRoutes = flightRoutes;
    }
    
    currentPersonRoutes = allRoutes[personName] || [];
    
    if (currentPersonRoutes.length === 0) {
        // No routes found, redirect to main page
        alert(`No flight routes found for ${personName}`);
        window.location.href = 'index.html';
        return;
    }
    
    initializeMap();
    updateMapHeader();
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    // Set up keyboard listeners
    document.addEventListener('keydown', handleKeyDown);
    
    // Set up click-outside-to-close for pinned modal
    setupModalClickOutside();
    
    // Add click handler to page header to navigate back to home
    const pageHeader = document.getElementById('pageHeader');
    if (pageHeader) {
        pageHeader.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
    
    // Handle window resize to ensure map adjusts to container size
    window.addEventListener('resize', () => {
        if (map) {
            map.invalidateSize();
            // Re-fit map to routes when resizing (will handle mobile vs desktop appropriately)
            fitMapToRoutes();
        }
    });
    
    // Start loading sequence
    startLoadingSequence();
});

// Initialize Leaflet Map
function initializeMap() {
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Create map with dark styling - enable interactions on mobile, disable on desktop
    // Set maxBounds to prevent duplicate world copies and ensure flight paths don't end at edges
    map = L.map('map', {
        center: [20, 0],
        zoom: 2,
        zoomControl: false, // Disable zoom controls
        attributionControl: false, // Disable attribution to prevent white box
        zoomSnap: 0.5,
        minZoom: 2,
        maxZoom: 5,
        worldCopyJump: false,
        maxBounds: [[-90, -180], [90, 180]], // Limit to single world copy, full world bounds
        dragging: isMobile, // Enable dragging on mobile for navigation
        touchZoom: isMobile, // Enable touch zoom on mobile
        doubleClickZoom: false, // Disable double-click zoom
        scrollWheelZoom: false, // Disable scroll wheel zoom
        boxZoom: false, // Disable box zoom
        keyboard: false, // Disable keyboard navigation
        tap: isMobile // Enable tap on mobile
    });
    
    // Explicitly hide attribution if it appears
    if (map.attributionControl) {
        map.attributionControl.remove();
    }
    
    // Use CartoDB Dark Matter tiles for dark aesthetic
    const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 5,
        tileSize: 256,
        noWrap: false // Allow wrapping for routes that cross date line, but maxBounds prevents duplicates
    });
    
    darkTiles.addTo(map);
    
    // Set dark background
    const mapContainer = map.getContainer();
    if (mapContainer) {
        mapContainer.style.backgroundColor = '#000000';
    }
    
    // Enable interactions on mobile, disable on desktop (isMobile already declared above)
    if (isMobile) {
        // On mobile: enable dragging and touch zoom so users can navigate
        map.dragging.enable();
        map.touchZoom.enable();
        // Enable tap for mobile interactions
        if (map.tap) {
            map.tap.enable();
        }
    } else {
        // On desktop: disable all interactions
        map.dragging.disable();
        map.touchZoom.disable();
        if (map.tap) {
            map.tap.disable();
        }
    }
    
    // Always disable these interactions
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    
    // Map is now initialized, invalidate size to ensure proper rendering
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 100);
}

// Update Map Header
function updateMapHeader() {
    const mapTitle = document.getElementById('mapTitle');
    const mapSubheader = document.getElementById('mapSubheader');
    
    if (mapTitle) {
        const nameUpper = personName.toUpperCase();
        mapTitle.textContent = `FLIGHT ROUTES - ${nameUpper} - 2025`;
    }
    
    if (mapSubheader) {
        mapSubheader.textContent = `DISPLAYING ${currentPersonRoutes.length} ROUTES`;
    }
}

// System Time
function updateSystemTime() {
    const systemTime = document.getElementById('systemTime');
    if (systemTime) {
        const time = getFormattedTime();
        systemTime.textContent = `SYSTEM TIME: ${time}`;
    }
}

function getFormattedTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Loading Sequence
function startLoadingSequence() {
    const loadingMessages = [
        'LOADING FLIGHT DATA...',
        'RENDERING ROUTES...',
        'PLOTTING COORDINATES...',
        'INITIALIZING MAP...'
    ];
    
    const loadingState = document.getElementById('mapLoadingState');
    const loadingMessage = document.getElementById('loadingMessage');
    const loadingStatus = document.getElementById('loadingStatus');
    const mapSection = document.getElementById('mapSection');
    
    let messageIndex = 0;
    
    const updateLoading = () => {
        if (messageIndex < loadingMessages.length) {
            if (loadingMessage) {
                loadingMessage.textContent = loadingMessages[messageIndex];
            }
            if (loadingStatus) {
                loadingStatus.textContent = `[${messageIndex + 1}/${loadingMessages.length}] Processing...`;
            }
            messageIndex++;
            setTimeout(updateLoading, 400);
        } else {
            // Hide loading, show map
            if (loadingState) {
                loadingState.style.display = 'none';
            }
            if (mapSection) {
                mapSection.style.display = 'block';
            }
            // Start drawing routes
            setTimeout(() => {
                drawAllRoutes();
                // Calculate and display emissions grade
                calculateAndDisplayEmissionsGrade();
            }, 500);
        }
    };
    
    updateLoading();
}

// Draw All Routes with Animation
function drawAllRoutes() {
    if (!map) {
        console.error('Map not initialized, retrying...');
        setTimeout(drawAllRoutes, 500);
        return;
    }
    
    // First, add all airports as markers
    const allAirports = new Map();
    
    currentPersonRoutes.forEach(route => {
        const fromCode = route.from.code;
        const toCode = route.to.code;
        
        if (!allAirports.has(fromCode)) {
            allAirports.set(fromCode, route.from);
        }
        if (!allAirports.has(toCode)) {
            allAirports.set(toCode, route.to);
        }
    });
    
    // Add airport markers
    allAirports.forEach((airport, code) => {
        addAirportMarker(airport);
    });
    
    // Calculate route offsets for duplicate routes
    calculateRouteOffsets();
    
    // Fit map to routes first
    fitMapToRoutes();
    
    // Wait a bit for map to settle, then animate routes one by one
    setTimeout(() => {
        animateRoutesSequentially(0);
    }, 300);
}

// Calculate vertical offsets for duplicate routes
function calculateRouteOffsets() {
    // Create a map to track route pairs and their counts
    const routePairCounts = new Map();
    
    currentPersonRoutes.forEach((route, index) => {
        const fromCode = route.from.code;
        const toCode = route.to.code;
        
        // Create a normalized key (alphabetically sorted to treat A->B and B->A as same pair)
        const pairKey = [fromCode, toCode].sort().join('-');
        
        if (!routePairCounts.has(pairKey)) {
            routePairCounts.set(pairKey, []);
        }
        routePairCounts.get(pairKey).push({ route, index });
    });
    
    // Assign offsets to duplicate routes
    routePairCounts.forEach((routes, pairKey) => {
        if (routes.length > 1) {
            // Multiple routes between same airports - assign offsets
            routes.forEach((routeInfo, routeIndex) => {
                const route = routeInfo.route;
                // First route curves up, second curves down, etc.
                // Offset alternates: +1 (up), -1 (down), +2 (higher up), -2 (lower down)
                const offsetMultiplier = routeIndex % 2 === 0 
                    ? Math.floor(routeIndex / 2) + 1  // Up: +1, +2, +3...
                    : -(Math.floor(routeIndex / 2) + 1); // Down: -1, -2, -3...
                route.verticalOffset = offsetMultiplier;
            });
        } else {
            // Single route - no offset needed
            routes[0].route.verticalOffset = 0;
        }
    });
}

// Animate Routes Sequentially
function animateRoutesSequentially(index) {
    if (index >= currentPersonRoutes.length) {
        // All routes drawn
        return;
    }
    
    const route = currentPersonRoutes[index];
    drawRoute(route, () => {
        // Update progress
        updateProgress(index + 1);
        // Update miles counter
        updateMilesCounter(index + 1);
        // Draw next route after delay
        setTimeout(() => {
            animateRoutesSequentially(index + 1);
        }, 150);
    });
}

// Draw Single Route
function drawRoute(route, callback) {
    if (!map) {
        console.error('Map not initialized');
        if (callback) callback();
        return;
    }
    
    const fromLat = route.from.lat;
    const fromLon = route.from.lon;
    const toLat = route.to.lat;
    const toLon = route.to.lon;
    
    // Get vertical offset for this route (to separate duplicate routes)
    const verticalOffset = route.verticalOffset || 0;
    
    // Create curved path using arc - may return multiple segments if crossing date line
    const arcSegments = createArc(fromLat, fromLon, toLat, toLon, verticalOffset);
    
    // Create a group to hold all polylines for this route
    const routePolylines = [];
    
    // Create a polyline for each segment
    arcSegments.forEach((segmentPoints, segmentIndex) => {
        // Create visible polyline with green color - make it interactive
        const polyline = L.polyline([], {
            color: '#00FF00',
            weight: 2,
            opacity: 0.7,
            interactive: true, // Make it interactive for hover/click
            className: 'flight-route-line'
        });
        
        // Add to map
        polyline.addTo(map);
        
        // Store route data on polyline
        polyline.routeData = route;
        polyline.route = route; // Store route for selection
        polyline.routeSegmentIndex = segmentIndex; // Track which segment this is
        polyline.allSegments = routePolylines; // Reference to all segments of this route
        
        // Add hover handlers directly to the visible polyline
        polyline.on('mouseenter', function(e) {
            const event = e.originalEvent || e;
            
            // Only proceed if this has a valid route
            if (!this.route) return;
            
            // Bring all segments of this route to front when hovering
            if (this.allSegments) {
                this.allSegments.forEach(seg => seg.bringToFront());
            } else {
                this.bringToFront();
            }
            
            // Show temporary modal on hover (not pinned)
            showFlightModal(route, event, false);
            
            // Highlight this route and fade all others
            highlightHoveredRoute(this);
        });
        
        polyline.on('mouseleave', function() {
            // Only proceed if this has a valid route
            if (!this.route) return;
            
            // Return to appropriate state based on selection
            if (!selectedRoute) {
                // No selection - return all routes to normal
                resetAllRoutes();
            } else {
                // A route is selected - restore selected state
                highlightSelectedRoute(selectedRoute);
            }
            
            // Hide modal only if not pinned
            hideModalIfNotPinned();
        });
        
        polyline.on('click', function(e) {
            const event = e.originalEvent || e;
            if (e.originalEvent) {
                e.originalEvent.stopPropagation();
            }
            
            // Bring all segments of this route to front when clicked
            if (this.allSegments) {
                this.allSegments.forEach(seg => seg.bringToFront());
            } else {
                this.bringToFront();
            }
            
            // If there's a previously selected route, reset it
            if (selectedRoute && selectedRoute !== this && selectedRoute.allSegments) {
                selectedRoute.allSegments.forEach(seg => resetRouteStyle(seg));
            } else if (selectedRoute && selectedRoute !== this) {
                resetRouteStyle(selectedRoute);
            }
            
            // Mark this route as selected (use first segment as reference)
            selectedRoute = this.allSegments ? this.allSegments[0] : this;
            
            // Highlight selected route and fade others
            highlightSelectedRoute(selectedRoute);
            
            // Pin the modal on click
            showFlightModal(route, event, true);
        });
        
        routePolylines.push(polyline);
        routeLines.push(polyline);
        
        // Animate polyline for this segment
        // Only call callback after the last segment is animated
        const isLastSegment = segmentIndex === arcSegments.length - 1;
        animatePolyline(polyline, segmentPoints, isLastSegment ? callback : null);
    });
}

// Split points array into segments when crossing the International Date Line
// This prevents horizontal lines from being drawn across the map
function splitPointsAtDateLine(points) {
    if (points.length === 0) return [points];
    
    const segments = [];
    let currentSegment = [points[0]];
    
    for (let i = 1; i < points.length; i++) {
        const prevLon = points[i - 1][1];
        const currLon = points[i][1];
        
        // Check if we've crossed the date line (180°/-180°)
        // This happens when longitude jumps from near -180 to near +180 or vice versa
        // We detect this by checking if the longitude difference is greater than 180°
        const lonDiff = Math.abs(currLon - prevLon);
        
        // If the longitude difference is greater than 180°, we've crossed the date line
        const crossesDateLine = lonDiff > 180;
        
        if (crossesDateLine) {
            // Save the current segment (which includes the previous point)
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
            }
            // Start a new segment with the current point
            currentSegment = [points[i]];
        } else {
            currentSegment.push(points[i]);
        }
    }
    
    // Add the last segment
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }
    
    // If no date line crossing was detected, return original points as single segment
    return segments.length > 0 ? segments : [points];
}

// Create Arc Between Two Points (Great Circle with natural curvature)
function createArc(lat1, lon1, lat2, lon2, verticalOffset = 0) {
    const points = [];
    const steps = 50;
    
    // Calculate distance in kilometers
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    
    // Arc height proportional to distance (longer flights = higher arc)
    // Convert km to degrees (approximate: 1 degree ≈ 111 km)
    // Use a moderate multiplier for realistic curves
    const arcHeightKm = distance * 0.1; // 10% of distance as arc height
    const arcHeightDegrees = arcHeightKm / 111;
    
    // Vertical offset for separating duplicate routes (in degrees)
    // Each offset unit = 0.5 degrees of latitude separation
    const verticalOffsetDegrees = verticalOffset * 0.5;
    
    // Check if this is a trans-Pacific route (NYC to Tokyo or vice versa)
    // NYC is around lon -73, Tokyo is around lon 140
    const isTransPacific = (
        (lon1 < -50 && lon2 > 100) || // NYC to Tokyo
        (lon1 > 100 && lon2 < -50)    // Tokyo to NYC
    );
    
    // Handle longitude interpolation for trans-Pacific routes
    let lon1Adjusted = lon1;
    let lon2Adjusted = lon2;
    let usePacificRoute = false;
    
    if (isTransPacific) {
        usePacificRoute = true;
        // Force route over Pacific Ocean
        if (lon1 < 0 && lon2 > 0) {
            // Going from negative (NYC) to positive (Tokyo) - go west over Pacific
            // Adjust: go west from lon1, cross date line, reach lon2
            lon2Adjusted = lon2 - 360; // Make Tokyo's longitude negative to force west route
        } else if (lon1 > 0 && lon2 < 0) {
            // Going from positive (Tokyo) to negative (NYC) - go east over Pacific
            // Adjust: go east from lon1, cross date line, reach lon2
            lon1Adjusted = lon1 - 360; // Make Tokyo's longitude negative
        }
    }
    
    // Calculate midpoint
    const midLat = (lat1 + lat2) / 2;
    const midLon = usePacificRoute ? (lon1Adjusted + lon2Adjusted) / 2 : (lon1 + lon2) / 2;
    
    // Calculate bearing to determine flight direction
    const bearing = calculateBearing(lat1, lon1Adjusted, lat2, lon2Adjusted);
    const bearingRad = bearing * Math.PI / 180;
    
    // Determine primary flight direction
    const latDiff = Math.abs(lat2 - lat1);
    const lonDiff = Math.abs(lon2Adjusted - lon1Adjusted);
    const isPrimarilyEastWest = lonDiff > latDiff * 1.5;
    const isPrimarilyNorthSouth = latDiff > lonDiff * 1.5;
    
    let offsetLat = 0;
    let offsetLon = 0;
    
    if (isPrimarilyEastWest) {
        // East-west flights: arc northward (towards pole) - typical great circle behavior
        // Arc towards the hemisphere with higher average latitude
        const avgLat = (lat1 + lat2) / 2;
        const arcDirection = avgLat >= 0 ? 1 : -1; // North if in northern hemisphere
        offsetLat = arcHeightDegrees * arcDirection + verticalOffsetDegrees; // Add vertical offset
        offsetLon = 0;
    } else if (isPrimarilyNorthSouth) {
        // North-south flights: arc east-west (perpendicular to direction)
        // Arc in the direction perpendicular to the bearing
        const perpAngle = bearingRad + Math.PI / 2;
        const latScale = Math.cos((midLat * Math.PI) / 180); // Account for latitude scaling
        offsetLat = verticalOffsetDegrees; // Add vertical offset
        offsetLon = Math.sin(perpAngle) * arcHeightDegrees / Math.max(latScale, 0.1);
    } else {
        // Diagonal flights: combine both offsets based on bearing
        const perpAngle = bearingRad + Math.PI / 2;
        const latScale = Math.cos((midLat * Math.PI) / 180);
        // Arc more towards the pole (latitude) with some longitude offset
        const avgLat = (lat1 + lat2) / 2;
        const arcDirection = avgLat >= 0 ? 1 : -1;
        offsetLat = arcHeightDegrees * 0.7 * arcDirection + verticalOffsetDegrees; // Add vertical offset
        offsetLon = Math.sin(perpAngle) * arcHeightDegrees * 0.3 / Math.max(latScale, 0.1);
    }
    
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        
        // Linear interpolation between start and end points
        let lat = lat1 + (lat2 - lat1) * t;
        let lon;
        
        if (usePacificRoute) {
            // For trans-Pacific routes, use adjusted longitudes
            lon = lon1Adjusted + (lon2Adjusted - lon1Adjusted) * t;
        } else {
            // For normal routes, use original longitudes
            lon = lon1 + (lon2 - lon1) * t;
        }
        
        // Add arc curve using sine wave (0 at start/end, maximum at midpoint)
        const curveFactor = Math.sin(t * Math.PI);
        lat += offsetLat * curveFactor;
        lon += offsetLon * curveFactor;
        
        // Normalize longitude to -180 to 180 range for display
        // This handles date line crossing properly
        while (lon < -180) lon += 360;
        while (lon > 180) lon -= 360;
        
        points.push([lat, lon]);
    }
    
    // Split points into segments if they cross the date line
    // This prevents horizontal lines across the map
    return splitPointsAtDateLine(points);
}

// Calculate bearing (direction) between two points in degrees
function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    const bearing = Math.atan2(y, x);
    return (bearing * 180 / Math.PI + 360) % 360; // Convert to degrees and normalize
}

// Calculate Distance Between Two Points (Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Animate Polyline Drawing
function animatePolyline(polyline, points, callback) {
    let currentPoints = [];
    const totalPoints = points.length;
    let index = 0;
    
    // Start with empty array to show line immediately
    polyline.setLatLngs([]);
    
    const animate = () => {
        if (index < totalPoints) {
            currentPoints.push(points[index]);
            polyline.setLatLngs(currentPoints);
            index++;
            requestAnimationFrame(animate);
        } else {
            // Ensure final points are set
            polyline.setLatLngs(points);
            if (callback) callback();
        }
    };
    
    // Small delay before starting animation
    setTimeout(() => {
        animate();
    }, 50);
}

// Add Airport Marker (non-interactive, just visual labels)
function addAirportMarker(airport) {
    // Create custom marker (green dot) - make it non-interactive
    const marker = L.circleMarker([airport.lat, airport.lon], {
        radius: 5,
        fillColor: '#00FF00',
        color: '#00FF00',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
        interactive: false // No interactions on airport markers
    }).addTo(map);
    
    // Add airport code label with offset so it doesn't overlap the dot - make it non-interactive
    const label = L.marker([airport.lat + 0.5, airport.lon + 0.5], {
        icon: L.divIcon({
            className: 'airport-label',
            html: `<div class="airport-code-label" data-airport-code="${airport.code}">${airport.code}</div>`,
            iconSize: [50, 20],
            iconAnchor: [25, 10]
        }),
        interactive: false, // No interactions on airport labels - just static labels
        zIndexOffset: 1000
    }).addTo(map);
    
    // Store airport data (for reference, but not used for interactions)
    marker.airportData = airport;
    marker.airportCode = airport.code;
    label.airportData = airport;
    label.airportCode = airport.code;
    
    // Store reference to marker elements for fading
    marker.markerElement = marker;
    marker.labelElement = label;
    label.markerElement = marker;
    label.labelElement = label;
    
    // NO hover or click handlers - airports are just visual labels now
    
    airportMarkers.push(marker, label);
}

// Fit Map to Routes
function fitMapToRoutes() {
    if (!map || currentPersonRoutes.length === 0) return;
    
    try {
        // Force map to recalculate its container size
        map.invalidateSize();
        
        // Use a small delay to ensure the container is properly sized
        setTimeout(() => {
            if (!map) return;
            
            // Ensure map size is recalculated
            map.invalidateSize();
            
            // Detect mobile device
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // On mobile: zoom to the most recent flight path
                if (currentPersonRoutes.length > 0) {
                    // Sort routes by date (most recent first)
                    const sortedRoutes = [...currentPersonRoutes].sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateB - dateA; // Sort descending (newest first)
                    });
                    
                    // Get the most recent route
                    const mostRecentRoute = sortedRoutes[0];
                    
                    // Create bounds for the most recent flight path
                    const bounds = L.latLngBounds([
                        [mostRecentRoute.from.lat, mostRecentRoute.from.lon],
                        [mostRecentRoute.to.lat, mostRecentRoute.to.lon]
                    ]);
                    
                    // Fit map to the most recent flight path with padding
                    if (bounds.isValid()) {
                        map.fitBounds(bounds, {
                            padding: [50, 50],
                            maxZoom: 10,
                            animate: false
                        });
                    } else {
                        // Fallback to global view
                        map.setView([20, 0], 2, { animate: false });
                    }
                } else {
                    // Fallback to global view if no routes
                    map.setView([20, 0], 2, { animate: false });
                }
                
                // Enable interactions on mobile so users can navigate
                map.dragging.enable();
                map.touchZoom.enable();
                // Enable tap for mobile interactions
                if (map.tap) {
                    map.tap.enable();
                }
            } else {
                // On desktop: zoom to the area where flight paths occur
                const bounds = L.latLngBounds([]);
                
                // Collect all airport coordinates from routes
                currentPersonRoutes.forEach(route => {
                    bounds.extend([route.from.lat, route.from.lon]);
                    bounds.extend([route.to.lat, route.to.lon]);
                });
                
                // Fit map to bounds with padding, and set a max zoom level to prevent over-zooming
                if (bounds.isValid()) {
                    map.fitBounds(bounds, {
                        padding: [50, 50], // Add padding around the bounds
                        maxZoom: 10, // Prevent zooming in too close
                        animate: false
                    });
                } else {
                    // Fallback to global view if bounds are invalid
                    map.setView([20, 0], 2, { animate: false });
                }
                
                // On desktop: disable all interactions
                map.dragging.disable();
                map.touchZoom.disable();
                if (map.tap) {
                    map.tap.disable();
                }
            }
            
            // Always disable these interactions
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
        }, 100);
    } catch (e) {
        console.error('Error setting map view:', e);
        // Fallback to default global view
        if (map) {
            const isMobileFallback = window.innerWidth <= 768;
            map.setView([20, 0], 2, { animate: false });
            if (isMobileFallback) {
                map.dragging.enable();
                map.touchZoom.enable();
            }
        }
    }
}

// Update Progress (no longer used - legend removed)
function updateProgress(count) {
    // Legend removed - function kept for backwards compatibility but does nothing
}

// Update Miles Counter
function updateMilesCounter(routeCount) {
    const milesCounter = document.getElementById('milesCounter');
    if (milesCounter) {
        let totalMiles = 0;
        for (let i = 0; i < routeCount; i++) {
            totalMiles += currentPersonRoutes[i].miles;
        }
        milesCounter.textContent = `TOTAL MILES: ${totalMiles.toLocaleString()}`;
    }
}

// Calculate and Display Emissions Grade
function calculateAndDisplayEmissionsGrade() {
    if (!currentPersonRoutes || currentPersonRoutes.length === 0) {
        return;
    }
    
    // Calculate total miles and number of flights
    let totalMiles = 0;
    const numFlights = currentPersonRoutes.length;
    
    currentPersonRoutes.forEach(route => {
        totalMiles += route.miles;
    });
    
    // Calculate average miles per flight
    const avgMilesPerFlight = totalMiles / numFlights;
    
    // Determine grade based on average miles per flight
    // Higher average = fewer takeoffs/landings per mile = better emissions grade
    let grade = 'F';
    let gradeClass = 'grade-f';
    let gradeExplanation = 'Many short flights - higher emissions per mile';
    
    if (avgMilesPerFlight >= 2000) {
        grade = 'A';
        gradeClass = 'grade-a';
        gradeExplanation = 'Long-haul flights - lower emissions per mile';
    } else if (avgMilesPerFlight >= 1000) {
        grade = 'B';
        gradeClass = 'grade-b';
        gradeExplanation = 'Medium to long flights - moderate emissions';
    } else if (avgMilesPerFlight >= 500) {
        grade = 'C';
        gradeClass = 'grade-c';
        gradeExplanation = 'Mixed flight distances - average emissions';
    } else if (avgMilesPerFlight >= 250) {
        grade = 'D';
        gradeClass = 'grade-d';
        gradeExplanation = 'Many medium flights - higher emissions per mile';
    } else {
        grade = 'F';
        gradeClass = 'grade-f';
        gradeExplanation = 'Many short flights - higher emissions per mile';
    }
    
    // Display the grade
    const emissionsSection = document.getElementById('emissionsGradeSection');
    const gradeValue = document.getElementById('emissionsGrade');
    const gradeDetails = document.getElementById('emissionsGradeDetails');
    
    if (emissionsSection && gradeValue && gradeDetails) {
        // Set the grade value and class
        gradeValue.textContent = grade;
        gradeValue.className = `emissions-grade-value ${gradeClass}`;
        
        // Set the details
        gradeDetails.innerHTML = `
            <div>${numFlights} FLIGHTS • ${totalMiles.toLocaleString()} TOTAL MILES</div>
            <div>AVG ${avgMilesPerFlight.toLocaleString(undefined, {maximumFractionDigits: 0})} MILES PER FLIGHT</div>
            <div style="margin-top: 10px; font-size: 16px; color: #99FF99;">${gradeExplanation}</div>
        `;
        
        // Show the section
        emissionsSection.style.display = 'block';
    }
}

// Show Flight Modal
function showFlightModal(route, event, pinned = false) {
    const modalOverlay = document.getElementById('flightModalOverlay');
    const modalBody = document.getElementById('flightModalBody');
    
    if (!modalOverlay || !modalBody) return;
    
    // Set pinning state
    modalPinned = pinned;
    
    // Add close button to header (always show for pinned panel)
    const modalHeader = document.querySelector('.flight-modal-header');
    if (modalHeader && pinned) {
        // Remove any existing close button
        const existingClose = modalHeader.querySelector('.modal-close');
        if (existingClose) {
            existingClose.remove();
        }
        
        // Add close button for pinned panel
        const closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.id = 'modalCloseBtn';
        closeButton.textContent = '[X]';
        closeButton.onclick = closeFlightModal;
        modalHeader.appendChild(closeButton);
    }
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="flight-detail-row">
            <div class="flight-detail-label">FROM:</div>
            <div class="flight-detail-value">${route.from.code} - ${route.from.name}</div>
        </div>
        <div class="flight-detail-row">
            <div class="flight-detail-label">TO:</div>
            <div class="flight-detail-value">${route.to.code} - ${route.to.name}</div>
        </div>
        <div class="flight-detail-row">
            <div class="flight-detail-label">DATE:</div>
            <div class="flight-detail-value">${route.date}</div>
        </div>
        <div class="flight-detail-row">
            <div class="flight-detail-label">DISTANCE:</div>
            <div class="flight-detail-value">${route.miles.toLocaleString()} MILES</div>
        </div>
        ${route.duration ? `
        <div class="flight-detail-row">
            <div class="flight-detail-label">DURATION:</div>
            <div class="flight-detail-value">${route.duration}</div>
        </div>
        ` : ''}
    `;
    
    // For pinned modals (clicked), show as right-side panel
    // For hover modals (temporary), don't show (let route highlighting do the work)
    const modal = document.getElementById('flightModal');
    
    if (!pinned) {
        // Hide modal on hover - we just want route highlighting
        if (modal) {
            modal.classList.remove('modal-panel-open');
        }
        modalOverlay.style.display = 'none';
        return;
    }
    
    // Position modal as right-side panel (only when pinned/clicked)
    if (modal) {
        modal.classList.add('modal-panel-open'); // Add class for slide-in animation
    }
    
    modalOverlay.style.display = 'flex';
    
    // Start plane animation when route is pinned/clicked
    if (pinned && route) {
        startPlaneAnimation(route);
    }
}

// Start Plane Animation Along Route
function startPlaneAnimation(route) {
    if (!map || !route) return;
    
    // Stop any existing animation
    stopPlaneAnimation();
    
    // Get the curved path points (use same vertical offset as the route)
    const verticalOffset = route.verticalOffset || 0;
    const arcSegments = createArc(route.from.lat, route.from.lon, route.to.lat, route.to.lon, verticalOffset);
    
    // Flatten segments into a single array of points for animation
    // If there are multiple segments (date line crossing), combine them
    const arcPoints = arcSegments.flat();
    
    if (arcPoints.length === 0) return;
    
    // Create a plane icon (simple green circle or custom icon)
    const planeIcon = L.divIcon({
        className: 'plane-marker',
        html: '<div style="color: #00FF00; font-size: 24px; text-shadow: 0 0 10px rgba(0, 255, 0, 0.8); transform: rotate(0deg);">✈</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    // Create plane marker at starting position
    planeMarker = L.marker([route.from.lat, route.from.lon], {
        icon: planeIcon,
        zIndexOffset: 1000 // Ensure plane is on top
    }).addTo(map);
    
    // Center map on starting airport first
    map.setView([route.from.lat, route.from.lon], map.getZoom(), { animate: false });
    
    // Animation parameters
    const duration = 10000; // 10 seconds
    const startTime = Date.now();
    
    // Animation function
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1); // 0 to 1
        
        // Calculate current position along the path
        const totalPoints = arcPoints.length;
        const currentPosition = progress * (totalPoints - 1);
        const index = Math.floor(currentPosition);
        const t = currentPosition - index; // Fraction between two points
        
        if (index < totalPoints - 1) {
            // Interpolate between current and next point
            const currentPoint = arcPoints[index];
            const nextPoint = arcPoints[index + 1];
            
            const lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * t;
            const lon = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * t;
            
            // Update plane position
            planeMarker.setLatLng([lat, lon]);
            
            // Calculate bearing for plane rotation
            // Bearing: 0° = North, 90° = East, 180° = South, 270° = West
            // Plane emoji default points right (90°), so we need to adjust
            if (nextPoint && currentPoint) {
                const bearing = calculateBearing(currentPoint[0], currentPoint[1], nextPoint[0], nextPoint[1]);
                // Adjust bearing: subtract 90° because plane emoji points right (east) by default
                // Then convert so 0° (north) points up
                const rotation = bearing - 90;
                
                const iconElement = planeMarker.getElement();
                if (iconElement) {
                    const planeDiv = iconElement.querySelector('div');
                    if (planeDiv) {
                        planeDiv.style.transform = `rotate(${rotation}deg)`;
                    }
                }
            }
            
            // Smoothly pan map to follow plane
            map.setView([lat, lon], map.getZoom(), { animate: false });
            
            animationFrameId = requestAnimationFrame(animate);
        } else {
            // Animation complete - position at destination
            const destination = arcPoints[arcPoints.length - 1];
            planeMarker.setLatLng([destination[0], destination[1]]);
            
            // Center map on destination airport and keep it there
            map.setView([route.to.lat, route.to.lon], map.getZoom(), { animate: true });
        }
    };
    
    // Start animation after a brief delay
    setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
    }, 100);
}

// Stop Plane Animation
function stopPlaneAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    if (planeMarker) {
        map.removeLayer(planeMarker);
        planeMarker = null;
    }
}

// Hide modal only if not pinned
function hideModalIfNotPinned() {
    if (!modalPinned) {
        const modalOverlay = document.getElementById('flightModalOverlay');
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    }
}

// Highlight Hovered Route and Fade Others (for hover state)
function highlightHoveredRoute(hoveredPolyline) {
    if (!hoveredPolyline || !hoveredPolyline.route) {
        return;
    }
    
    const hoveredRoute = hoveredPolyline.route;
    const hoveredFromCode = hoveredRoute.from.code;
    const hoveredToCode = hoveredRoute.to.code;
    
    // Loop through all route lines
    routeLines.forEach(line => {
        // Skip if this isn't a polyline with a route
        if (!line.route) return;
        
        // Check if this is the hovered route by comparing airport codes (both directions)
        const isHovered = (line.route.from.code === hoveredFromCode && 
                          line.route.to.code === hoveredToCode) ||
                          (line.route.from.code === hoveredToCode && 
                          line.route.to.code === hoveredFromCode);
        
        // Apply styles with multiple methods to ensure they stick
        if (isHovered) {
            // HOVERED ROUTE - Make it much larger, brighter, and prominent
            line.setStyle({
                color: '#66FF66',
                weight: 8,
                opacity: 1.0
            });
            
            line.bringToFront();
            
            // Force immediate style update by directly manipulating SVG
            const updateStyles = () => {
                const element = line.getElement();
                if (element) {
                    element.classList.add('hovered-route');
                    const paths = element.querySelectorAll('path');
                    paths.forEach(path => {
                        // Set both attributes and inline styles for maximum compatibility
                        path.setAttribute('stroke', '#66FF66');
                        path.setAttribute('stroke-width', '8');
                        path.setAttribute('opacity', '1');
                        path.style.stroke = '#66FF66';
                        path.style.strokeWidth = '8px';
                        path.style.opacity = '1';
                    });
                }
            };
            
            // Try immediately and also after a short delay to catch any race conditions
            updateStyles();
            setTimeout(updateStyles, 10);
            setTimeout(updateStyles, 50);
        } else {
            // OTHER ROUTES - Make them much darker
            line.setStyle({
                color: '#001100',
                weight: 1,
                opacity: 0.15
            });
            
            // Force immediate style update by directly manipulating SVG
            const updateStyles = () => {
                const element = line.getElement();
                if (element) {
                    element.classList.remove('hovered-route');
                    const paths = element.querySelectorAll('path');
                    paths.forEach(path => {
                        // Set both attributes and inline styles for maximum compatibility
                        path.setAttribute('stroke', '#001100');
                        path.setAttribute('stroke-width', '1');
                        path.setAttribute('opacity', '0.15');
                        path.style.stroke = '#001100';
                        path.style.strokeWidth = '1px';
                        path.style.opacity = '0.15';
                    });
                }
            };
            
            // Try immediately and also after a short delay to catch any race conditions
            updateStyles();
            setTimeout(updateStyles, 10);
            setTimeout(updateStyles, 50);
        }
    });
    
    // Fade airport markers that aren't part of the hovered route
    airportMarkers.forEach(marker => {
        if (!marker.airportCode) return;
        
        const isPartOfHoveredRoute = marker.airportCode === hoveredFromCode || 
                                     marker.airportCode === hoveredToCode;
        
        if (isPartOfHoveredRoute) {
            // This airport is part of the hovered route - keep bright
            if (marker.setStyle) {
                marker.setStyle({
                    fillColor: '#66FF66',
                    color: '#66FF66',
                    fillOpacity: 0.9,
                    opacity: 1.0
                });
            }
            // Brighten the label
            const labelElement = marker.labelElement;
            if (labelElement && labelElement.getElement) {
                const labelEl = labelElement.getElement();
                if (labelEl) {
                    labelEl.style.opacity = '1';
                    const codeLabel = labelEl.querySelector('.airport-code-label');
                    if (codeLabel) {
                        codeLabel.style.color = '#66FF66';
                        codeLabel.style.textShadow = '0 0 15px rgba(102, 255, 102, 0.9)';
                    }
                }
            }
        } else {
            // Fade other airports
            if (marker.setStyle) {
                marker.setStyle({
                    fillColor: '#001100',
                    color: '#001100',
                    fillOpacity: 0.2,
                    opacity: 0.2
                });
            }
            // Fade the label
            const labelElement = marker.labelElement;
            if (labelElement && labelElement.getElement) {
                const labelEl = labelElement.getElement();
                if (labelEl) {
                    labelEl.style.opacity = '0.2';
                    const codeLabel = labelEl.querySelector('.airport-code-label');
                    if (codeLabel) {
                        codeLabel.style.color = '#001100';
                        codeLabel.style.textShadow = 'none';
                    }
                }
            }
        }
    });
}

// Highlight Selected Route and Fade Others
function highlightSelectedRoute(selectedPolyline) {
    if (!selectedPolyline || !selectedPolyline.route) return;
    
    const selectedRoute = selectedPolyline.route;
    
    // Get the two airport codes for the selected route
    const selectedFromCode = selectedRoute.from.code;
    const selectedToCode = selectedRoute.to.code;
    
    // Loop through all route lines
    routeLines.forEach(line => {
        // Only process polylines with routes
        if (!line.route) return;
            
        // Check if this route matches the selected one (compare both directions)
        const isSelected = (line.route.from.code === selectedFromCode && 
                          line.route.to.code === selectedToCode) ||
                          (line.route.from.code === selectedToCode && 
                          line.route.to.code === selectedFromCode);
        
        if (isSelected) {
            // SELECTED ROUTE - Make it bright and prominent
            line.setStyle({
                color: '#00FF00',
                weight: 4,
                opacity: 1.0
            });
            
            // Also directly set SVG attributes to ensure they apply
            const element = line.getElement();
            if (element) {
                element.classList.add('selected-route');
                const paths = element.querySelectorAll('path');
                paths.forEach(path => {
                    path.setAttribute('stroke', '#00FF00');
                    path.setAttribute('stroke-width', '4');
                    path.setAttribute('opacity', '1');
                    path.style.stroke = '#00FF00';
                    path.style.strokeWidth = '4px';
                    path.style.opacity = '1';
                });
            }
        } else {
            // OTHER ROUTES - Fade them out
            line.setStyle({
                color: '#004400', // Very dark green
                weight: 2,
                opacity: 0.3
            });
            
            // Also directly set SVG attributes to ensure they apply
            const element = line.getElement();
            if (element) {
                element.classList.remove('selected-route');
                const paths = element.querySelectorAll('path');
                paths.forEach(path => {
                    path.setAttribute('stroke', '#004400');
                    path.setAttribute('stroke-width', '2');
                    path.setAttribute('opacity', '0.3');
                    path.style.stroke = '#004400';
                    path.style.strokeWidth = '2px';
                    path.style.opacity = '0.3';
                });
            }
        }
    });
    
    // Fade airport markers that aren't part of the selected route
    airportMarkers.forEach(marker => {
        if (marker.airportCode) {
            const isPartOfSelectedRoute = marker.airportCode === selectedFromCode || 
                                          marker.airportCode === selectedToCode;
            
            if (isPartOfSelectedRoute) {
                // This airport is part of the selected route - keep bright
                if (marker.setStyle) {
                    marker.setStyle({
                        fillColor: '#00FF00',
                        color: '#00FF00',
                        fillOpacity: 0.8,
                        opacity: 1.0
                    });
                }
                // Brighten the label too
                const labelElement = marker.labelElement;
                if (labelElement && labelElement.getElement) {
                    const labelEl = labelElement.getElement();
                    if (labelEl) {
                        labelEl.style.opacity = '1';
                        const codeLabel = labelEl.querySelector('.airport-code-label');
                        if (codeLabel) {
                            codeLabel.style.color = '#00FF00';
                            codeLabel.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.8)';
                        }
                    }
                }
            } else {
                // Fade other airports
                if (marker.setStyle) {
                    marker.setStyle({
                        fillColor: '#004400',
                        color: '#004400',
                        fillOpacity: 0.3,
                        opacity: 0.3
                    });
                }
                // Fade the label
                const labelElement = marker.labelElement;
                if (labelElement && labelElement.getElement) {
                    const labelEl = labelElement.getElement();
                    if (labelEl) {
                        labelEl.style.opacity = '0.3';
                        const codeLabel = labelEl.querySelector('.airport-code-label');
                        if (codeLabel) {
                            codeLabel.style.color = '#004400';
                            codeLabel.style.textShadow = 'none';
                        }
                    }
                }
            }
        }
    });
}

// Reset route style to normal
function resetRouteStyle(polyline) {
    if (!polyline) return;
    
    polyline.setStyle({
        color: '#00FF00',
        weight: 2,
        opacity: 0.7
    });
    
    // Also directly set SVG attributes to ensure they apply
    const element = polyline.getElement();
    if (element) {
        element.classList.remove('selected-route');
        element.classList.remove('hovered-route');
        const paths = element.querySelectorAll('path');
        paths.forEach(path => {
            path.setAttribute('stroke', '#00FF00');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('opacity', '0.7');
            path.style.stroke = '#00FF00';
            path.style.strokeWidth = '2px';
            path.style.opacity = '0.7';
        });
    }
}

// Reset all routes and airports to normal state
function resetAllRoutes() {
    // Reset all route lines
    routeLines.forEach(line => {
        if (line && line.route) {
            // This is a polyline with a route, reset it
            line.setStyle({
                color: '#00FF00',
                weight: 2,
                opacity: 0.7
            });
            
            // Force immediate style update by directly manipulating SVG
            const updateStyles = () => {
                const element = line.getElement();
                if (element) {
                    element.classList.remove('selected-route');
                    element.classList.remove('hovered-route');
                    const paths = element.querySelectorAll('path');
                    paths.forEach(path => {
                        path.setAttribute('stroke', '#00FF00');
                        path.setAttribute('stroke-width', '2');
                        path.setAttribute('opacity', '0.7');
                        path.style.stroke = '#00FF00';
                        path.style.strokeWidth = '2px';
                        path.style.opacity = '0.7';
                    });
                }
            };
            
            // Try immediately and also after a short delay
            updateStyles();
            setTimeout(updateStyles, 10);
            setTimeout(updateStyles, 50);
        }
    });
    
    // Reset all airport markers
    airportMarkers.forEach(marker => {
        if (marker.setStyle) {
            marker.setStyle({
                fillColor: '#00FF00',
                color: '#00FF00',
                fillOpacity: 0.8,
                opacity: 1.0
            });
        }
        // Reset the label
        const labelElement = marker.labelElement;
        if (labelElement && labelElement.getElement) {
            const labelEl = labelElement.getElement();
            if (labelEl) {
                labelEl.style.opacity = '1';
                const codeLabel = labelEl.querySelector('.airport-code-label');
                if (codeLabel) {
                    codeLabel.style.color = '#00FF00';
                    codeLabel.style.textShadow = '0 0 5px rgba(0, 255, 0, 0.8)';
                }
            }
        }
    });
}

// Close modal (called from close button or ESC)
function closeFlightModal() {
    modalPinned = false;
    selectedRoute = null; // Clear selection
    
    // Stop plane animation
    stopPlaneAnimation();
    
    // Reset all routes to normal state
    resetAllRoutes();
    
    // Reset map view to show all routes (default view)
    fitMapToRoutes();
    
    const modalOverlay = document.getElementById('flightModalOverlay');
    const modal = document.getElementById('flightModal');
    
    if (modal) {
        modal.classList.remove('modal-panel-open'); // Remove class for slide-out animation
    }
    
    if (modalOverlay) {
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modalOverlay.style.display = 'none';
        }, 300); // Match animation duration
    }
}

// Make closeFlightModal globally available
window.closeFlightModal = closeFlightModal;

// Return to leaderboard with person highlighted
function returnToLeaderboard() {
    if (personName) {
        window.location.href = `index.html?person=${encodeURIComponent(personName)}#leaderboard`;
    } else {
        window.location.href = 'index.html#leaderboard';
    }
}

// Make returnToLeaderboard globally available
window.returnToLeaderboard = returnToLeaderboard;

// Keyboard Handler
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        const modalOverlay = document.getElementById('flightModalOverlay');
        if (modalOverlay && modalOverlay.style.display !== 'none') {
            // Close modal if it's open (pinned or not)
            closeFlightModal();
        } else {
            // Return to leaderboard
            window.location.href = 'index.html';
        }
    }
}

// Close modal when clicking outside of it (only if pinned)
function setupModalClickOutside() {
    document.addEventListener('click', function(e) {
        const modalOverlay = document.getElementById('flightModalOverlay');
        const modal = document.getElementById('flightModal');
        
        if (modalPinned && modalOverlay && modal) {
            // Check if click is outside the modal
            if (!modal.contains(e.target) && e.target !== modal) {
                closeFlightModal();
            }
        }
    });
}

