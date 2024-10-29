const personName = document.querySelector('.person-name');
const personProfession = document.querySelector('.profession');
const reviewText = document.querySelector('.testimonial');
const profileImage = document.querySelector('.profile-image')
// arrow buttons and buttons
const previousButton = document.querySelector('.prev-arrow');
const nextButton = document.querySelector('.next-arrow');
const randomButton = document.querySelector('.surprise-btn')

testimonialLists = [
    {
        name: "Logos Caster",
        profession: "Whistle Shop",
        personImage: "images/Logos.webp",
        imageAlt: function () {
            return `${this.name} image`;
        },
        testimonials: "When attacking a target, there is a 40% chance to deal 60% ATK as Arts damage to a random target in attack range and Slow it for 0.8s"
    },
    {
        name: "Ray Sniper",
        profession: "Winged Step",
        personImage: "images/Ray.webp",
        imageAlt: function () {
            return `${this.name} image`;
        },
        testimonials: "Can deploy a sandbeast within Attack Range to scout an area for 15s, extending Attack Range into that area. Prioritizes attacking targets within this area, and deals 10% more Physical damage to them"
    },
    {
        name: "Wiš'adel Sniper",
        profession: "Winged Step",
        personImage: "images/Wisadel.webp",
        imageAlt: function () {
            return `${this.name} image`;
        },
        testimonials: "Truthfully, I've thought up countless possibilities about coming back here, looking out at" +
            " the same scenery that she saw that day... But I never could have imagined that I'd actually be standing here with you. It's all too outrageous!"
    }
]

let currentIndex = 0;

console.log(testimonialLists.length)

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex === testimonialLists.length) {
        currentIndex = 0;
    }
    changeReview(currentIndex)
})

previousButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = testimonialLists.length - 1;
    }
    changeReview(currentIndex)
})

randomButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * testimonialLists.length);
    changeReview(randomIndex);
})

function changeReview(currentIndex) {
    personName.textContent = testimonialLists[currentIndex].name;
    personProfession.textContent = testimonialLists[currentIndex].profession;
    profileImage.src = testimonialLists[currentIndex].personImage;
    profileImage.alt = testimonialLists[currentIndex].imageAlt();
    reviewText.textContent = testimonialLists[currentIndex].testimonials;
}