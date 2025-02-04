document.addEventListener("DOMContentLoaded", () => {
    const delegateList = document.getElementById("delegateList");
    const activityLog = document.getElementById("activityLog");
    const speechTimerDisplay = document.getElementById("timer");
    const voteTimerDisplay = document.getElementById("voteCountdown");
    let speechTime = 60; // Default speech time in seconds
    let voteTime = 30; // Default vote time in seconds

    // Register Delegate
    document.getElementById("registerDelegate").addEventListener("click", () => {
        let delegateName = document.getElementById("delegateName").value.trim();
        if (delegateName === "") {
            alert("Please enter a delegate name.");
            return;
        }
        let li = document.createElement("li");
        li.textContent = delegateName;
        delegateList.appendChild(li);
        logActivity(`${delegateName} has joined the session.`);
        document.getElementById("delegateName").value = "";
    });

    // Propose Motion
    document.getElementById("motionBtn").addEventListener("click", () => {
        let motionType = document.getElementById("motionType").value;
        let motionTime = document.getElementById("motionTime").value;
        if (motionTime === "") {
            alert("Please specify a duration for the motion.");
            return;
        }
        logActivity(`Motion proposed: ${motionType} for ${motionTime} minutes.`);
        alert("Motion proposed! Awaiting voting.");
    });

    // Raise Point
    document.getElementById("pointBtn").addEventListener("click", () => {
        logActivity("A point has been raised by a delegate.");
        alert("Point raised!");
    });

    // Debate Speech Submission
    document.getElementById("submitSpeech").addEventListener("click", () => {
        let speech = document.getElementById("debate-input").value.trim();
        if (speech === "") {
            alert("Please enter a speech before submitting.");
            return;
        }
        logActivity(`Speech delivered: "${speech}"`);
        document.getElementById("debate-input").value = "";
    });

    // Speech Timer Countdown
    function startSpeechTimer() {
        let timeLeft = speechTime;
        let timer = setInterval(() => {
            speechTimerDisplay.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                logActivity("Speech time has ended.");
            }
            timeLeft--;
        }, 1000);
    }

    // Start Voting
    document.getElementById("startVote").addEventListener("click", () => {
        logActivity("Voting has started.");
        startVoteTimer();
    });

    function startVoteTimer() {
        let timeLeft = voteTime;
        let timer = setInterval(() => {
            voteTimerDisplay.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                logActivity("Voting has ended.");
            }
            timeLeft--;
        }, 1000);
    }

    // Log Activities in Real-Time
    function logActivity(message) {
        let logEntry = document.createElement("p");
        logEntry.textContent = message;
        activityLog.appendChild(logEntry);
    }

    // Format Time Display
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
