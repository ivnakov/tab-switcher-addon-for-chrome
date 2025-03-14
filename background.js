let tabs = []
let currentIndex = 0;
let isRotating = false;
let intervalId;

function switchTabs(){
    if(tabs.length > 0){
        console.log('Switching to tab', tabs[currentIndex]);
        chrome.tabs.update(tabs[currentIndex], {active: true});
        currentIndex = (currentIndex + 1) % tabs.length;
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if(request.action === 'start' && !isRotating){
        isRotating = true;
        chrome.tabs.query({currentWindow: true}, function(allTabs){
            tabs = allTabs.map(tab => tab.id);
            const interval = request.interval * 1000; // Convert seconds to milliseconds
            intervalId = setInterval(switchTabs, interval); //Switch tabs every <interval> seconds
        });
    } else if(request.action === 'stop' && isRotating){
        clearInterval(intervalId);
        isRotating = false;
    };
});

chrome.tabs.query({currentWindow: true}, function(allTabs){
    tabs = allTabs.map(tab => tab.id);
});
