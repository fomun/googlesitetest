document.addEventListener("DOMContentLoaded", () => {
    // Motion Button
    document.getElementById("motionBtn").addEventListener("click", () => {
        alert("Motion Proposed!");
    });

    // Point Button
    document.getElementById("pointBtn").addEventListener("click", () => {
        alert("Point Raised!");
    });

    // Debate Submission
    document.getElementById("submitSpeech").addEventListener("click", () => {
        let speech = document.getElementById("debate-input").value;
        if (speech.trim() === "") {
            alert("Please enter a speech before submitting.");
            return;
        }
        
        let log = document.getElementById("debate-log");
        let speechEntry = document.createElement("p");
        speechEntry.textContent = speech;
        log.appendChild(speechEntry);
        document.getElementById("debate-input").value = "";
    });

    // Voting System
    document.getElementById("startVote").addEventListener("click", () => {
        let result = confirm("Proceed to voting? All delegates will vote now.");
        if (result) {
            document.getElementById("voteResults").textContent = "Voting in Progress...";
            setTimeout(() => {
                document.getElementById("voteResults").textContent = "Voting Complete! Results will be displayed soon.";
            }, 3000);
        }
    });
});
