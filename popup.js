document.addEventListener("DOMContentLoaded", function () {
  let inrevalId;

  document.getElementById("start").addEventListener("click", () => {
    const intervalInput = document.getElementById("interval");
    const interval = parseInt(intervalInput.value, 10);
    
    console.log(interval);

    if(isNaN(interval) || interval <= 0){
      alert("Interval must be a positive number");
      return;
    }
    chrome.runtime.sendMessage({ action: "start", interval: interval});
    document.getElementById("status").innerText = "Running";
  });

  document.getElementById("stop").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stop" });
    document.getElementById("status").innerText = "Stopped";
  });
});
