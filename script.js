// Flight Routes Data
const flightRoutes = {
    "CJ": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            date: "2025-04-03", miles: 431, duration: "1h 30m"
        },
        {
            id: 2,
            from: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-04-22", miles: 431, duration: "1h 30m"
        },
        {
            id: 3,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            date: "2025-10-06", miles: 2565, duration: "5h 45m"
        },
        {
            id: 4,
            from: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-10-10", miles: 2565, duration: "5h 45m"
        }
    ],
    "JT": [
        {
            id: 1,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "MRS", name: "Marseille Provence", lat: 43.4393, lon: 5.2214 },
            date: "2025-02-27", miles: 650, duration: "2h 00m"
        },
        {
            id: 2,
            from: { code: "MRS", name: "Marseille Provence", lat: 43.4393, lon: 5.2214 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-03-02", miles: 650, duration: "2h 00m"
        },
        {
            id: 3,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "BOS", name: "Logan International", lat: 42.3656, lon: -71.0096 },
            date: "2025-04-18", miles: 3260, duration: "7h 30m"
        },
        {
            id: 4,
            from: { code: "BOS", name: "Logan International", lat: 42.3656, lon: -71.0096 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-04-24", miles: 3260, duration: "7h 30m"
        },
        {
            id: 5,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "ARN", name: "Stockholm Arlanda", lat: 59.6519, lon: 17.9186 },
            date: "2025-05-15", miles: 900, duration: "2h 30m"
        },
        {
            id: 6,
            from: { code: "ARN", name: "Stockholm Arlanda", lat: 59.6519, lon: 17.9186 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-05-18", miles: 900, duration: "2h 30m"
        },
        {
            id: 7,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "FAO", name: "Faro Airport", lat: 37.0144, lon: -7.9659 },
            date: "2025-06-04", miles: 1000, duration: "2h 45m"
        },
        {
            id: 8,
            from: { code: "FAO", name: "Faro Airport", lat: 37.0144, lon: -7.9659 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-06-10", miles: 1000, duration: "2h 45m"
        },
        {
            id: 9,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "FCO", name: "Rome Fiumicino", lat: 41.8003, lon: 12.2389 },
            date: "2025-09-25", miles: 900, duration: "2h 30m"
        },
        {
            id: 10,
            from: { code: "FCO", name: "Rome Fiumicino", lat: 41.8003, lon: 12.2389 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-09-28", miles: 900, duration: "2h 30m"
        },
        {
            id: 11,
            from: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            to: { code: "VIE", name: "Vienna International", lat: 48.1103, lon: 16.5697 },
            date: "2025-11-02", miles: 800, duration: "2h 15m"
        },
        {
            id: 12,
            from: { code: "PRG", name: "Prague Václav Havel", lat: 50.1008, lon: 14.2633 },
            to: { code: "LHR", name: "London Heathrow", lat: 51.4700, lon: -0.4543 },
            date: "2025-11-09", miles: 650, duration: "2h 00m"
        }
    ],
    "Mike": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-01-30", miles: 2475, duration: "5h 30m"
        },
        {
            id: 2,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-02-02", miles: 2475, duration: "5h 30m"
        }
    ],
    "Commish": [
        {
            id: 1,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            date: "2025-04-02", miles: 337, duration: "1h 25m"
        },
        {
            id: 2,
            from: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-04-07", miles: 337, duration: "1h 25m"
        },
        {
            id: 3,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "HNL", name: "Honolulu International", lat: 21.3206, lon: -157.9242 },
            date: "2025-04-17", miles: 2556, duration: "5h 45m"
        },
        {
            id: 4,
            from: { code: "HNL", name: "Honolulu International", lat: 21.3206, lon: -157.9242 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-04-23", miles: 2556, duration: "5h 45m"
        },
        {
            id: 5,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "JFK", name: "John F. Kennedy International", lat: 40.6413, lon: -73.7781 },
            date: "2025-06-27", miles: 2475, duration: "5h 30m"
        },
        {
            id: 6,
            from: { code: "JFK", name: "John F. Kennedy International", lat: 40.6413, lon: -73.7781 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-07-04", miles: 2475, duration: "5h 30m"
        },
        {
            id: 7,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "YVR", name: "Vancouver International", lat: 49.1947, lon: -123.1792 },
            date: "2025-09-12", miles: 1100, duration: "2h 45m"
        },
        {
            id: 8,
            from: { code: "YVR", name: "Vancouver International", lat: 49.1947, lon: -123.1792 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-09-20", miles: 1100, duration: "2h 45m"
        },
        {
            id: 9,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "EWR", name: "Newark Liberty International", lat: 40.6895, lon: -74.1745 },
            date: "2025-10-17", miles: 2450, duration: "5h 15m"
        },
        {
            id: 10,
            from: { code: "EWR", name: "Newark Liberty International", lat: 40.6895, lon: -74.1745 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-10-20", miles: 2450, duration: "5h 15m"
        },
        {
            id: 11,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            date: "2025-11-05", miles: 337, duration: "1h 25m"
        },
        {
            id: 12,
            from: { code: "SFO", name: "San Francisco International", lat: 37.6213, lon: -122.3790 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-11-09", miles: 337, duration: "1h 25m"
        },
        {
            id: 13,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "EWR", name: "Newark Liberty International", lat: 40.6895, lon: -74.1745 },
            date: "2025-12-19", miles: 2450, duration: "5h 15m"
        },
        {
            id: 14,
            from: { code: "EWR", name: "Newark Liberty International", lat: 40.6895, lon: -74.1745 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-12-30", miles: 2450, duration: "5h 15m"
        }
    ],
    "Stevie": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "NRT", name: "Tokyo Narita International", lat: 35.7720, lon: 140.3929 },
            date: "2025-12-07", miles: 6745, duration: "14h 30m"
        },
        {
            id: 2,
            from: { code: "NRT", name: "Tokyo Narita International", lat: 35.7720, lon: 140.3929 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-12-17", miles: 6745, duration: "13h 00m"
        }
    ],
    "Ada": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            date: "2025-04-03", miles: 431, duration: "1h 30m"
        },
        {
            id: 2,
            from: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-04-22", miles: 431, duration: "1h 30m"
        }
    ],
    "Maggie": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            date: "2025-04-03", miles: 431, duration: "1h 30m"
        },
        {
            id: 2,
            from: { code: "RDU", name: "Raleigh-Durham International", lat: 35.8776, lon: -78.7875 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-04-22", miles: 431, duration: "1h 30m"
        }
    ],
    "Piotr": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-01-30", miles: 2475, duration: "5h 30m"
        },
        {
            id: 2,
            from: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-02-02", miles: 2475, duration: "5h 30m"
        }
    ],
    "Omer": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "SDF", name: "Louisville Muhammad Ali International", lat: 38.1744, lon: -85.7364 },
            date: "2025-02-27", miles: 660, duration: "2h 15m"
        },
        {
            id: 2,
            from: { code: "SDF", name: "Louisville Muhammad Ali International", lat: 38.1744, lon: -85.7364 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-03-02", miles: 660, duration: "2h 15m"
        },
        {
            id: 3,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "ATL", name: "Hartsfield-Jackson Atlanta International", lat: 33.6407, lon: -84.4277 },
            date: "2025-07-18", miles: 760, duration: "2h 30m"
        },
        {
            id: 4,
            from: { code: "ATL", name: "Hartsfield-Jackson Atlanta International", lat: 33.6407, lon: -84.4277 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-07-20", miles: 760, duration: "2h 30m"
        }
    ],
    "Dan": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "DUB", name: "Dublin Airport", lat: 53.4264, lon: -6.2499 },
            date: "2025-10-22", miles: 3170, duration: "7h 00m"
        },
        {
            id: 2,
            from: { code: "DUB", name: "Dublin Airport", lat: 53.4264, lon: -6.2499 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-11-06", miles: 3170, duration: "7h 00m"
        }
    ],
    "Ana": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "ORD", name: "Chicago O'Hare", lat: 41.9742, lon: -87.9073 },
            date: "2025-03-25", miles: 740, duration: "2h 30m"
        },
        {
            id: 2,
            from: { code: "ORD", name: "Chicago O'Hare", lat: 41.9742, lon: -87.9073 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-03-28", miles: 740, duration: "2h 30m"
        },
        {
            id: 3,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "NRT", name: "Tokyo Narita International", lat: 35.7720, lon: 140.3929 },
            date: "2025-12-07", miles: 6745, duration: "14h 30m"
        },
        {
            id: 4,
            from: { code: "NRT", name: "Tokyo Narita International", lat: 35.7720, lon: 140.3929 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-12-17", miles: 6745, duration: "13h 00m"
        }
    ],
    "Greg": [
        {
            id: 1,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "FLL", name: "Fort Lauderdale-Hollywood International", lat: 26.0722, lon: -80.1528 },
            date: "2025-01-30", miles: 1095, duration: "2h 45m"
        },
        {
            id: 2,
            from: { code: "FLL", name: "Fort Lauderdale-Hollywood International", lat: 26.0722, lon: -80.1528 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-02-02", miles: 1095, duration: "2h 45m"
        },
        {
            id: 3,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "LAS", name: "Las Vegas McCarran International", lat: 36.0840, lon: -115.1537 },
            date: "2025-03-27", miles: 2245, duration: "5h 15m"
        },
        {
            id: 4,
            from: { code: "LAS", name: "Las Vegas McCarran International", lat: 36.0840, lon: -115.1537 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-03-29", miles: 2245, duration: "5h 15m"
        },
        {
            id: 5,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "DEN", name: "Denver International", lat: 39.8561, lon: -104.6737 },
            date: "2025-04-16", miles: 1625, duration: "4h 00m"
        },
        {
            id: 6,
            from: { code: "DEN", name: "Denver International", lat: 39.8561, lon: -104.6737 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-04-21", miles: 1625, duration: "4h 00m"
        },
        {
            id: 7,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "TPE", name: "Taipei Taoyuan International", lat: 25.0797, lon: 121.2342 },
            date: "2025-07-27", miles: 7965, duration: "15h 30m"
        },
        {
            id: 8,
            from: { code: "TPE", name: "Taipei Taoyuan International", lat: 25.0797, lon: 121.2342 },
            to: { code: "BKK", name: "Bangkok Suvarnabhumi", lat: 13.6811, lon: 100.7478 },
            date: "2025-07-27", miles: 1020, duration: "3h 30m"
        },
        {
            id: 9,
            from: { code: "BKK", name: "Bangkok Suvarnabhumi", lat: 13.6811, lon: 100.7478 },
            to: { code: "CNX", name: "Chiang Mai International", lat: 18.7668, lon: 98.9626 },
            date: "2025-08-05", miles: 370, duration: "1h 15m"
        },
        {
            id: 10,
            from: { code: "CNX", name: "Chiang Mai International", lat: 18.7668, lon: 98.9626 },
            to: { code: "BKK", name: "Bangkok Suvarnabhumi", lat: 13.6811, lon: 100.7478 },
            date: "2025-08-07", miles: 370, duration: "1h 15m"
        },
        {
            id: 11,
            from: { code: "BKK", name: "Bangkok Suvarnabhumi", lat: 13.6811, lon: 100.7478 },
            to: { code: "TPE", name: "Taipei Taoyuan International", lat: 25.0797, lon: 121.2342 },
            date: "2025-08-11", miles: 1020, duration: "3h 30m"
        },
        {
            id: 12,
            from: { code: "TPE", name: "Taipei Taoyuan International", lat: 25.0797, lon: 121.2342 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-08-11", miles: 7965, duration: "14h 00m"
        },
        {
            id: 13,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "CDG", name: "Paris Charles de Gaulle", lat: 49.0097, lon: 2.5479 },
            date: "2025-09-16", miles: 3635, duration: "7h 30m"
        },
        {
            id: 14,
            from: { code: "CDG", name: "Paris Charles de Gaulle", lat: 49.0097, lon: 2.5479 },
            to: { code: "FLR", name: "Florence Peretola", lat: 43.8100, lon: 11.2051 },
            date: "2025-09-17", miles: 550, duration: "1h 30m"
        },
        {
            id: 15,
            from: { code: "FCO", name: "Rome Fiumicino", lat: 41.8003, lon: 12.2389 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-09-20", miles: 4280, duration: "8h 45m"
        },
        {
            id: 16,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "DCA", name: "Washington Reagan National", lat: 38.8512, lon: -77.0402 },
            date: "2025-12-10", miles: 205, duration: "1h 15m"
        },
        {
            id: 17,
            from: { code: "DCA", name: "Washington Reagan National", lat: 38.8512, lon: -77.0402 },
            to: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            date: "2025-12-11", miles: 205, duration: "1h 15m"
        },
        {
            id: 18,
            from: { code: "NYC", name: "New York City (JFK)", lat: 40.6413, lon: -73.7781 },
            to: { code: "LAX", name: "Los Angeles International", lat: 33.9416, lon: -118.4085 },
            date: "2025-12-20", miles: 2475, duration: "5h 30m"
        }
    ]
};

// Flight Data
const flightData = [
    {
        id: 1,
        name: "CJ",
        image: "images/cj.png",
        totalMiles: 5992,
        flights: 4,
        flightTime: 15,
        quote: "they asked if i wanted to do it in private. i said no touch me in public baby"
    },
    {
        id: 2,
        name: "JT",
        image: "images/jt.png",
        totalMiles: 15770,
        flights: 12,
        flightTime: 40,
        quote: "Collecting miles, one flight at a time."
    },
    {
        id: 3,
        name: "Mike",
        image: "images/mike.png",
        totalMiles: 4950,
        flights: 2,
        flightTime: 11,
        quote: "Europe blows"
    },
    {
        id: 4,
        name: "Commish",
        image: "images/commish.png",
        totalMiles: 20424,
        flights: 14,
        flightTime: 55,
        quote: "It's a mullet trip. Biz in the front end, pleasure in the back."
    },
    {
        id: 5,
        name: "Stevie",
        image: "images/stevie.png",
        totalMiles: 13490,
        flights: 2,
        flightTime: 28,
        quote: "every time I see the bold text on airbors channel im hoping its the wrapped posts. 2025 has been nothing short of a dissapoiment in here"
    },
    {
        id: 6,
        name: "Ada",
        image: "images/ada.png",
        totalMiles: 862,
        flights: 2,
        flightTime: 3,
        quote: "Adventure awaits at every destination."
    },
    {
        id: 7,
        name: "Maggie",
        image: "https://i.pravatar.cc/150?img=33",
        totalMiles: 862,
        flights: 2,
        flightTime: 3,
        quote: "Heading to the south for 3 weeks while they finish our apartment"
    },
    {
        id: 8,
        name: "Piotr",
        image: "images/piotr.png",
        totalMiles: 4950,
        flights: 2,
        flightTime: 11,
        quote: "@JT why are you requesting my location? Feels like a breach of my privacy"
    },
    {
        id: 9,
        name: "Omer",
        image: "images/omer.png",
        totalMiles: 2840,
        flights: 4,
        flightTime: 10,
        quote: "Jet set, never forget."
    },
    {
        id: 10,
        name: "Dan",
        image: "https://i.pravatar.cc/150?img=70",
        totalMiles: 6340,
        flights: 2,
        flightTime: 14,
        quote: "Flying high, staying grounded."
    },
    {
        id: 11,
        name: "Ana",
        image: "https://i.pravatar.cc/150?img=25",
        totalMiles: 14970,
        flights: 4,
        flightTime: 32,
        quote: "Exploring the world, one flight at a time."
    },
    {
        id: 12,
        name: "Greg",
        image: "images/greg.png",
        totalMiles: 35740,
        flights: 18,
        flightTime: 90,
        quote: "I'm going to Thailand for sports stuff"
    }
];

// State Management
let currentState = 'landing';
let searchedPerson = null;

// DOM Elements
const landingState = document.getElementById('landingState');
const loadingState = document.getElementById('loadingState');
const leaderboardState = document.getElementById('leaderboardState');
const helpState = document.getElementById('helpState');
const nameInput = document.getElementById('nameInput');
const tableBody = document.getElementById('tableBody');
const profileCardContainer = document.getElementById('profileCardContainer');
const resetButton = document.getElementById('resetButton');
const systemTime = document.getElementById('systemTime');
const leaderboardTime = document.getElementById('leaderboardTime');
const errorModalOverlay = document.getElementById('errorModalOverlay');
const errorModalButton = document.getElementById('errorModalButton');
const warningModalOverlay = document.getElementById('warningModalOverlay');
const warningModalButton = document.getElementById('warningModalButton');
const searchButton = document.getElementById('searchButton');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    // Initialize search button state
    updateSearchButtonState();
    
    // Check if we should show leaderboard directly (from map page)
    if (window.location.hash === '#leaderboard') {
        // Check if a person was specified in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const personParam = urlParams.get('person');
        
        if (personParam) {
            // Find and highlight the specified person
            searchedPerson = flightData.find(
                person => person.name.toUpperCase() === personParam.toUpperCase()
            );
        } else {
            searchedPerson = null; // No specific person selected
        }
        
        showLeaderboard();
    } else {
        // Focus input on load
        nameInput.focus();
    }
    
    // Play beep sound on initialization (optional)
    // playBeep(200, 0.1);
});

// Event Listeners
function initializeEventListeners() {
    nameInput.addEventListener('keydown', handleKeyDown);
    nameInput.addEventListener('input', handleInput);
    resetButton.addEventListener('click', resetToLanding);
    errorModalButton.addEventListener('click', hideErrorModal);
    warningModalButton.addEventListener('click', hideWarningModal);
    
    // Search button click handler
    if (searchButton) {
        searchButton.addEventListener('click', handleSearchButtonClick);
    }
    
    // Add click handler to page header (only on index.html, not map.html)
    const pageHeader = document.getElementById('pageHeader');
    if (pageHeader && !document.body.classList.contains('map-page')) {
        pageHeader.addEventListener('click', resetToLanding);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (errorModalOverlay.style.display !== 'none') {
                hideErrorModal();
            } else if (currentState !== 'landing') {
                resetToLanding();
            }
        }
    });
}

function handleKeyDown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const name = nameInput.value.trim().toUpperCase();
        if (name) {
            handleSearch(name);
        }
    }
}

function handleInput(e) {
    const value = e.target.value.toUpperCase();
    e.target.value = value;
    
    // Update search button state
    updateSearchButtonState();
}

function updateSearchButtonState() {
    if (searchButton) {
        const hasText = nameInput.value.trim().length > 0;
        searchButton.disabled = !hasText;
    }
}

function handleSearchButtonClick() {
    if (searchButton && !searchButton.disabled) {
        const name = nameInput.value.trim().toUpperCase();
        if (name) {
            handleSearch(name);
        }
    }
}

// Search Handler
function handleSearch(searchName, skipLoading = false) {
    // Check for easter eggs
    if (checkEasterEggs(searchName)) {
        return;
    }
    
    // Map search aliases to canonical names
    const nameAliases = {
        'CHRIS JONES': 'CJ',
        'CHRIS': 'CJ',
        'PH': 'Commish',
        'STEPHEN': 'Commish',
        'STEPHEN PINTO': 'Commish'
    };
    
    // Normalize search name (use alias if exists, otherwise use original)
    const normalizedSearchName = (nameAliases[searchName] || searchName).toUpperCase();
    
    // Find person
    searchedPerson = flightData.find(
        person => person.name.toUpperCase() === normalizedSearchName
    );
    
    // If person not found, show error and return to landing
    if (!searchedPerson) {
        if (skipLoading) {
            resetToLanding();
            setTimeout(() => {
                showErrorModal();
            }, 500);
        } else {
            showLoading();
            simulateLoading(() => {
                resetToLanding();
                setTimeout(() => {
                    showErrorModal();
                }, 500);
            });
        }
        return;
    }
    
    // Check if this is Piotr (id: 8) and show warning modal
    if (searchedPerson.id === 8) {
        showWarningModal(() => {
            // After user clicks "UNDERSTOOD", proceed with showing leaderboard
            if (skipLoading) {
                showLeaderboard();
            } else {
                showLoading();
                simulateLoading(() => {
                    showLeaderboard();
                });
            }
        });
        return;
    }
    
    // If skipping loading (e.g., clicking from leaderboard), navigate directly
    if (skipLoading) {
        showLeaderboard();
        return;
    }
    
    // Show loading for new searches
    showLoading();
    
    // Simulate loading sequence
    simulateLoading(() => {
        showLeaderboard();
    });
}

// Direct navigation to a user (used when clicking from leaderboard)
function navigateToUser(personName) {
    handleSearch(personName.toUpperCase(), true);
}

// Easter Eggs
function checkEasterEggs(input) {
    const upperInput = input.toUpperCase();
    
    if (upperInput === 'LEADERBOARD') {
        searchedPerson = null; // No specific person selected
        showLoading();
        simulateLoading(() => {
            showLeaderboard();
        });
        return true;
    }
    
    if (upperInput === 'HELP') {
        showHelp();
        return true;
    }
    
    if (upperInput === 'CLEAR') {
        resetToLanding();
        return true;
    }
    
    if (upperInput === 'TIME') {
        alert(`SYSTEM TIME: ${getFormattedTime()}`);
        return true;
    }
    
    if (upperInput === 'VERSION') {
        alert('AirBros Wrapped 2025\nVersion: 1.0.0\nBuild Date: 2025-12-20\nTerminal: VT100 Compatible');
        return true;
    }
    
    if (upperInput === 'CREDITS') {
        alert('AirBros Wrapped 2025\nDeveloped with retro terminal aesthetics\nInspired by 1980s computer terminals\n\nSpecial thanks to all the frequent flyers!');
        return true;
    }
    
    return false;
}

// Loading Sequence
function showLoading() {
    currentState = 'loading';
    document.body.classList.remove('leaderboard-active');
    landingState.style.display = 'none';
    loadingState.style.display = 'flex';
    leaderboardState.style.display = 'none';
    helpState.style.display = 'none';
}

function simulateLoading(callback) {
    const loadingMessages = [
        'ACCESSING DATABASE...',
        'CONNECTING TO SERVER...',
        'LOADING FLIGHT RECORDS...',
        'PROCESSING STATISTICS...',
        'GENERATING LEADERBOARD...',
        'FINALIZING DATA...'
    ];
    
    const loadingStatus = document.getElementById('loadingStatus');
    const loadingMessage = document.getElementById('loadingMessage');
    const progressFill = document.getElementById('progressFill');
    
    let messageIndex = 0;
    let progress = 0;
    
    const updateProgress = () => {
        if (messageIndex < loadingMessages.length) {
            loadingMessage.textContent = loadingMessages[messageIndex];
            loadingStatus.textContent = `[${messageIndex + 1}/${loadingMessages.length}] Processing...`;
            
            // Animate progress bar
            const targetProgress = ((messageIndex + 1) / loadingMessages.length) * 100;
            animateProgress(progress, targetProgress, () => {
                messageIndex++;
                if (messageIndex < loadingMessages.length) {
                    setTimeout(updateProgress, 300);
                } else {
                    setTimeout(() => {
                        progressFill.style.width = '100%';
                        loadingStatus.textContent = 'COMPLETE.';
                        setTimeout(callback, 500);
                    }, 300);
                }
            });
        }
    };
    
    updateProgress();
}

function animateProgress(from, to, callback) {
    const progressFill = document.getElementById('progressFill');
    const duration = 300;
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = from + (to - from) * progress;
        
        progressFill.style.width = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (callback) callback();
        }
    };
    
    animate();
}

// Leaderboard Display
function showLeaderboard() {
    currentState = 'leaderboard';
    document.body.classList.add('leaderboard-active');
    landingState.style.display = 'none';
    loadingState.style.display = 'none';
    leaderboardState.style.display = 'block';
    helpState.style.display = 'none';
    
    renderLeaderboard();
    
    if (searchedPerson) {
        renderProfileCard(searchedPerson);
    }
    
    // Scroll to top when showing leaderboard
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderLeaderboard() {
    tableBody.innerHTML = '';
    
    // Sort by total miles (descending), but always put Piotr (id: 8) at the bottom
    const sortedData = [...flightData].sort((a, b) => {
        // If either is Piotr (id: 8), put them at the bottom
        if (a.id === 8 && b.id !== 8) return 1;
        if (b.id === 8 && a.id !== 8) return -1;
        // Otherwise sort by miles descending
        return b.totalMiles - a.totalMiles;
    });
    
    sortedData.forEach((person, index) => {
        const rank = index + 1;
        const row = createTableRow(person, rank);
        tableBody.appendChild(row);
        
        // Add delay for row appearance
        setTimeout(() => {
            row.style.opacity = '1';
        }, index * 50);
    });
}

function createTableRow(person, rank) {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.style.opacity = '0';
    
    const isPiotr = person.id === 8;
    if (isPiotr) {
        row.classList.add('disqualified');
    }
    
    // Highlight if this is the searched person
    const isHighlighted = searchedPerson && person.id === searchedPerson.id;
    if (isHighlighted) {
        row.classList.add('highlighted');
    } else {
        // Make non-highlighted rows clickable
        row.classList.add('clickable');
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            navigateToUser(person.name);
        });
    }
    
    const disqualificationBadge = isPiotr ? '<span class="disqualification-badge">⚠ DISQUALIFIED</span>' : '';
    
    row.innerHTML = `
        <div class="col-rank">${rank}</div>
        <div class="col-picture">
            <img src="${person.image}" alt="${person.name}" class="profile-picture" onerror="this.src='https://via.placeholder.com/60?text=?'">
        </div>
        <div class="col-name">${person.name.toUpperCase()} ${disqualificationBadge}</div>
        <div class="col-miles">${formatNumber(person.totalMiles)}</div>
        <div class="col-flights">${person.flights}</div>
        <div class="col-time">${person.flightTime}H</div>
    `;
    
    return row;
}

function renderProfileCard(person) {
    const isPiotr = person.id === 8;
    const disqualificationBadge = isPiotr ? '<span class="disqualification-badge">⚠ DISQUALIFIED</span>' : '';
    const cardClass = isPiotr ? 'profile-card disqualified' : 'profile-card';
    
    profileCardContainer.innerHTML = `
        <div class="${cardClass}" id="profileCard">
            <div class="profile-card-header">
                <img src="${person.image}" alt="${person.name}" class="profile-picture-large" onerror="this.src='https://via.placeholder.com/120?text=?'">
                <div class="profile-header-info">
                    <div class="profile-name-large">${person.name.toUpperCase()} ${disqualificationBadge}</div>
                    <div class="profile-rank" style="font-size: 18px; ${isPiotr ? 'color: #33AA33; opacity: 0.6;' : 'color: #33FF33;'} margin-top: 5px;">
                        RANK #${getRank(person.id)}
                    </div>
                    <div class="profile-quote-section">
                        ${person.quote ? `<div class="profile-quote">"${person.quote}"</div>` : '<div></div>'}
                        <button class="terminal-button profile-map-button" onclick="handleMapButtonClick('${person.name}', ${person.id})">VIEW FLIGHT MAP</button>
                    </div>
                </div>
            </div>
            <div class="profile-stats">
                <div class="stat-item">
                    <div class="stat-label">TOTAL MILES</div>
                    <div class="stat-value">${formatNumber(person.totalMiles)}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">FLIGHTS</div>
                    <div class="stat-value">${person.flights}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">FLIGHT TIME</div>
                    <div class="stat-value">${person.flightTime} HOURS</div>
                </div>
            </div>
        </div>
    `;
}

function getRank(personId) {
    // Sort by total miles (descending), but always put Piotr (id: 8) at the bottom
    const sortedData = [...flightData].sort((a, b) => {
        // If either is Piotr (id: 8), put them at the bottom
        if (a.id === 8 && b.id !== 8) return 1;
        if (b.id === 8 && a.id !== 8) return -1;
        // Otherwise sort by miles descending
        return b.totalMiles - a.totalMiles;
    });
    return sortedData.findIndex(p => p.id === personId) + 1;
}

// Download Image
function downloadImage() {
    const profileCard = document.getElementById('profileCard');
    if (!profileCard) return;
    
    // Play beep
    playBeep(300, 0.1);
    
    html2canvas(profileCard, {
        backgroundColor: '#000000',
        scale: 2,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${searchedPerson.name.replace(/\s+/g, '_')}_AirBros_Wrapped_2025.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Share Link
function shareLink() {
    const personName = searchedPerson ? searchedPerson.name : '';
    const shareText = `Check out ${personName}'s AirBros Wrapped 2025 stats!`;
    const shareUrl = window.location.href;
    const button = this || document.getElementById('shareButton');
    
    // Play beep
    playBeep(400, 0.1);
    
    if (navigator.share) {
        navigator.share({
            title: 'AirBros Wrapped 2025',
            text: shareText,
            url: shareUrl
        }).catch(err => {
            copyToClipboard(shareUrl, button);
        });
    } else {
        copyToClipboard(shareUrl, button);
    }
}

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const button = buttonElement || document.querySelector('button[onclick="shareLink()"]');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'COPIED!';
            button.style.color = '#33FF33';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = '#00FF00';
            }, 2000);
        } else {
            alert('Link copied to clipboard!');
        }
    }).catch(err => {
        alert('Failed to copy link. Please copy manually: ' + text);
    });
}

// Help Screen
function showHelp() {
    currentState = 'help';
    document.body.classList.remove('leaderboard-active');
    landingState.style.display = 'none';
    loadingState.style.display = 'none';
    leaderboardState.style.display = 'none';
    helpState.style.display = 'flex';
    nameInput.value = '';
}

function hideHelp() {
    currentState = 'landing';
    document.body.classList.remove('leaderboard-active');
    landingState.style.display = 'flex';
    loadingState.style.display = 'none';
    leaderboardState.style.display = 'none';
    helpState.style.display = 'none';
    nameInput.focus();
}

// Reset
function resetToLanding() {
    currentState = 'landing';
    document.body.classList.remove('leaderboard-active');
    searchedPerson = null;
    landingState.style.display = 'flex';
    loadingState.style.display = 'none';
    leaderboardState.style.display = 'none';
    helpState.style.display = 'none';
    nameInput.value = '';
    nameInput.focus();
    profileCardContainer.innerHTML = '';
    tableBody.innerHTML = '';
    
    // Update search button state
    updateSearchButtonState();
    
    // Play beep
    playBeep(150, 0.1);
}

// System Time
function updateSystemTime() {
    const time = getFormattedTime();
    if (systemTime) {
        systemTime.textContent = `SYSTEM TIME: ${time}`;
    }
    if (leaderboardTime) {
        leaderboardTime.textContent = `SYSTEM TIME: ${time}`;
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

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// Sound Effects (Web Audio API)
function playBeep(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        // Silently fail if audio context is not available
    }
}

// Error Modal
function showErrorModal() {
    if (errorModalOverlay) {
        errorModalOverlay.style.display = 'flex';
        playBeep(200, 0.15);
    }
}

function hideErrorModal() {
    if (errorModalOverlay) {
        errorModalOverlay.style.display = 'none';
        playBeep(300, 0.1);
        // Reset to landing state and focus input
        resetToLanding();
        nameInput.focus();
    }
}

// Warning Modal
let warningModalCallback = null;

function showWarningModal(callback) {
    if (warningModalOverlay) {
        warningModalCallback = callback;
        warningModalOverlay.style.display = 'flex';
        playBeep(250, 0.15);
    }
}

function hideWarningModal() {
    if (warningModalOverlay) {
        warningModalOverlay.style.display = 'none';
        playBeep(300, 0.1);
        // Execute callback if provided
        if (warningModalCallback) {
            warningModalCallback();
            warningModalCallback = null;
        }
    }
}

// Handle map button click - show warning for Piotr
function handleMapButtonClick(personName, personId) {
    if (personId === 8) {
        // Piotr - show warning modal first
        showWarningModal(() => {
            window.location.href = `map.html?person=${encodeURIComponent(personName)}`;
        });
    } else {
        // Other people - navigate directly
        window.location.href = `map.html?person=${encodeURIComponent(personName)}`;
    }
}

// Make handleMapButtonClick globally available
window.handleMapButtonClick = handleMapButtonClick;

// Make functions globally available
window.downloadImage = downloadImage;
window.shareLink = shareLink;
window.hideHelp = hideHelp;

// Make flightRoutes available globally for map page
window.flightRoutes = flightRoutes;

