const sampleData = [
    {
        title: "Cozy Apartment in Paris",
        description: "Charming apartment in the heart of Paris with a view of the Eiffel Tower",
        image: {
            filename: "listingImage",
            url: "https://plus.unsplash.com/premium_photo-1661676056771-f6c2711249e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDE%3D"
        },
        price: 150,
        location: "Paris",
        country: "France",
    },
    {
        title: "Beachfront Villa in Maldives",
        description: "Luxurious villa steps away from the crystal-clear waters of the Maldives",
        image:
        {
            filename: "listingImage",
            url: "https://plus.unsplash.com/premium_photo-1685284204244-f5ff83a88523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHwx"
        },
        price: 500,
        location: "Maldives",
        country: "Maldives",
    },
    {
        title: "Mountain Cabin in Aspen",
        description: "Rustic cabin nestled in the mountains of Aspen, perfect for a ski getaway",
        image: {
            filextent: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1663093806285-d905ca96c661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fHwx"
        },
        price: 300,
        location: "Aspen",
        country: "United States",
    },
    {
        title: "Seaside Bungalow in Bali",
        description: "Relaxing bungalow with ocean views in Bali's tranquil coastal area",
        image: {
            filename: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1687995672195-0676a1e1d4f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvdGVsfGVufDB8fDB8fHwx"
        },
        price: 200,
        location: "Bali",
        country: "Indonesia",
    },
    {
        title: "Urban Loft in Manhattan",
        description: "Modern loft apartment in the bustling heart of Manhattan, close to all attractions",
        image: {
            filename: "listing",
            url: "https://plus.unsplash.com/premium_photo-1685290652343-ba086daade9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsfGVufDB8fDB8fHwx"
        },
        price: 250,
        location: "New York City",
        country: "United States",
    },
    {
        title: "Luxury Chalet in Swiss Alps",
        description: "Exquisite chalet with stunning mountain views in the Swiss Alps",
        image: {
            filename: "listing",
            url: "https://plus.unsplash.com/premium_photo-1661369889067-c86c31362f83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDE%3D"
        },
        price: 600,
        location: "Zermatt",
        country: "Switzerland",
    },
    {
        title: "Historic Riad in Marrakech",
        description: "Traditional Moroccan riad with a courtyard oasis in vibrant Marrakech",
        image: {
            filename: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1685284204244-f5ff83a88523?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdGVsfGVufDB8fDB8fHwx"
        },
        price: 120,
        location: "Marrakech",
        country: "Morocco",
    },
    {
        title: "Secluded Cottage in Scotland",
        description: "Quaint cottage nestled in the Scottish countryside, perfect for nature lovers",
        image: {
            filename: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1675039871348-6a717479cf37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJlc29ydHxlbnwwfHwwfHx8MQ%3D%3D"
        },
        price: 100,
        location: "Scottish Highlands",
        country: "United Kingdom",
    },
    {
        title: "Tropical Villa in Phuket",
        description: "Spacious villa with a private pool and lush gardens in sunny Phuket",
        image: {
            filename: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1675039871615-22f85ccea8a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJlc29ydHxlbnwwfHwwfHx8MQ%3D%3D"
        },
        price: 180,
        location: "Phuket",
        country: "Thailand",
    },
    {
        title: "Modern Apartment in Barcelona",
        description: "Sleek and stylish apartment in the heart of Barcelona's vibrant district",
        image: {
            filename: "listing.jpg",
            url: "https://plus.unsplash.com/premium_photo-1675039871615-22f85ccea8a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJlc29ydHxlbnwwfHwwfHx8MQ%3D%3D"
        },
        price: 200,
        location: "Barcelona",
        country: "Spain",
    }
];
module.exports = { data: sampleData };