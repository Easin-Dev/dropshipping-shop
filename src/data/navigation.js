// data/navigation.js

export const allCategories = [
    { name: 'Mobile Essentials', href: '/collections/mobile-essentials' },
    { name: 'Audio Zone', href: '/collections/audio' },
    { name: 'Smart Home Devices', href: '/collections/smart-home' },
    { name: 'Computer Accessories', href: '/collections/computer-accessories' },
    { name: 'Wearables & Fitness', href: '/collections/wearables' },
    { name: 'Gaming Gear', href: '/collections/gaming-gear' },
];

export const offerDeals = [
    { name: 'Flash Sale', href: '/deals/flash-sale' },
    { name: 'Bundle & Save', href: '/deals/bundle-save' },
    { name: 'Clearance', href: '/deals/clearance' },
];

export const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'All Categories', href: '/collections', subLinks: allCategories },
    { name: 'Best Sellers', href: '/collections/best-seller' },
    { name: 'Deals', href: '/deals', subLinks: offerDeals },
    { name: 'Track Your Order', href: '/track-order' },
];