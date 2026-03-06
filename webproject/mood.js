const moodCards = document.querySelectorAll(".mood-card");
const songsContainer = document.getElementById("songs-container");
const moodHeading = document.getElementById("mood-heading");

const songsData = {
    happy: [
        "Happy – Pharrell Williams",
        "Can't Stop the Feeling – Justin Timberlake",
        "On Top of the World – Imagine Dragons"
    ],
    sad: [
        "Someone Like You – Adele",
        "Let Her Go – Passenger",
        "All I Want – Kodaline"
    ],
    chill: [
        "Sunset Lover – Petit Biscuit",
        "Lo-fi Beats Mix",
        "Cold Little Heart – Michael Kiwanuka"
    ],
    romantic: [
        "Perfect – Ed Sheeran",
        "Until I Found You – Stephen Sanchez",
        "Just the Way You Are – Bruno Mars"
    ],
    angry: [
        "Believer – Imagine Dragons",
        "Stronger – Kanye West",
        "Numb – Linkin Park"
    ]
};

moodCards.forEach(card => {
    card.addEventListener("click", () => {

        // Remove active class
        moodCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const mood = card.dataset.mood;
        displaySongs(mood);
    });
});

function displaySongs(mood) {
    moodHeading.textContent = `Songs for ${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`;
    songsContainer.innerHTML = "";

    songsData[mood].forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.classList.add("song-card");
        songDiv.textContent = song;
        songsContainer.appendChild(songDiv);
    });
}
