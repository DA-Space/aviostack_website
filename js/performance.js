// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = '/js/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }

    // Defer non-critical scripts
    const deferScripts = () => {
        const scripts = [
            '/js/animations.js',
            '/js/contact.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.body.appendChild(script);
        });
    };
    
    // Wait for idle time to load non-critical scripts
    if ('requestIdleCallback' in window) {
        requestIdleCallback(deferScripts);
    } else {
        setTimeout(deferScripts, 1);
    }
});

// Monitor performance
const reportPerformance = () => {
    if ('performance' in window) {
        const timing = performance.timing;
        const performanceMetrics = {
            pageLoadTime: timing.loadEventEnd - timing.navigationStart,
            domReadyTime: timing.domComplete - timing.domLoading,
            firstPaintTime: performance.getEntriesByType('paint')[0]?.startTime
        };
        
        // Send metrics to analytics
        console.log('Performance Metrics:', performanceMetrics);
    }
};

window.addEventListener('load', reportPerformance);