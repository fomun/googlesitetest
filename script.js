document.addEventListener("DOMContentLoaded", () => {
    const delegateList = document.getElementById("delegateList");
    const activityLog = document.getElementById("activityLog");
    const speechTimerDisplay = document.getElementById("timer");
    const voteTimerDisplay = document.getElementById("voteCountdown");
    const resolutionText = document.getElementById("resolutionText");
    let speechTime = 60;
    let voteTime = 30;
    let delegates = [];

    // Register Delegate
    document.getElementById("registerDelegate").addEventListener("click", () => {
        let delegateName = document.getElementById("delegateName").value.trim();
        let delegateRole = document.getElementById("delegateRole").value;
        let delegateCountry = document.getElementById("delegateCountry").value;
        
        if (delegateName === "") {
            alert("Please enter a delegate name.");
            return;
        }
        
        let delegate = { name: delegateName, role: delegateRole, country: delegateCountry };
        delegates.push(delegate);
        
        let li = document.createElement("li");
        li.textContent = `${delegateCountry} - ${delegateName} (${delegateRole})`;
        delegateList.appendChild(li);
        logActivity(`${delegateName} from ${delegateCountry} has joined as ${delegateRole}.`);
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

    // Chairperson Control - Approve/Reject Motion
    document.getElementById("approveMotion").addEventListener("click", () => {
        logActivity("Motion approved by Chairperson.");
    });

    document.getElementById("rejectMotion").addEventListener("click", () => {
        logActivity("Motion rejected by Chairperson.");
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

    // Private Messaging System
    document.getElementById("sendMessage").addEventListener("click", () => {
        let recipient = document.getElementById("messageRecipient").value.trim();
        let message = document.getElementById("privateMessage").value.trim();
        if (recipient === "" || message === "") {
            alert("Enter recipient and message before sending.");
            return;
        }
        logActivity(`Private message sent to ${recipient}: "${message}"`);
        document.getElementById("privateMessage").value = "";
    });

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

    // Resolution Submission
    document.getElementById("submitResolution").addEventListener("click", () => {
        let resolutionContent = resolutionText.value.trim();
        if (resolutionContent === "") {
            alert("Enter resolution content before submitting.");
            return;
        }
        logActivity("Resolution submitted: " + resolutionContent);
        resolutionText.value = "";
    });
});
