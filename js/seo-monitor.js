// SEO Performance Monitoring
class SEOMonitor {
    constructor() {
        this.initPerformanceMonitoring();
        this.checkImageAltTags();
        this.checkHeadingHierarchy();
    }

    initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const performance = window.performance;
            if (performance) {
                const timing = performance.timing;
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`Page Load Time: ${pageLoadTime}ms`);

                // Send to analytics if too slow
                if (pageLoadTime > 3000) {
                    this.reportPerformanceIssue('slow-page-load', pageLoadTime);
                }
            }
        });
    }

    checkImageAltTags() {
        // Ensure all images have alt tags
        const images = document.getElementsByTagName('img');
        for (const img of images) {
            if (!img.alt) {
                console.warn('Missing alt tag:', img.src);
            }
        }
    }

    checkHeadingHierarchy() {
        // Check for proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let lastLevel = 0;
        
        headings.forEach(heading => {
            const currentLevel = parseInt(heading.tagName[1]);
            if (currentLevel - lastLevel > 1) {
                console.warn('Skipped heading level:', heading);
            }
            lastLevel = currentLevel;
        });
    }

    reportPerformanceIssue(type, value) {
        // Send to your analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_issue', {
                'event_category': 'SEO',
                'event_label': type,
                'value': value
            });
        }
    }
}

// Initialize SEO monitoring
document.addEventListener('DOMContentLoaded', () => {
    new SEOMonitor();
});