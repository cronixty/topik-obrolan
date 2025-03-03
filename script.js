function getZodiac(day, month) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
}

const zodiacTraits = {
    "Aries": { traits: "Berani, energik, suka tantangan", habits: "Cepat bertindak, kompetitif", compatibility: ["Leo", "Sagittarius"] },
    "Taurus": { traits: "Sabar, setia, praktis", habits: "Menikmati kenyamanan, keras kepala", compatibility: ["Virgo", "Capricorn"] },
    "Gemini": { traits: "Pintar, adaptable, komunikatif", habits: "Suka belajar, mudah bosan", compatibility: ["Libra", "Aquarius"] },
    "Cancer": { traits: "Penuh perasaan, setia, protektif", habits: "Suka rumah, sensitif", compatibility: ["Scorpio", "Pisces"] },
    "Leo": { traits: "Percaya diri, ambisius, pemimpin", habits: "Suka perhatian, dramatis", compatibility: ["Aries", "Sagittarius"] },
    "Virgo": { traits: "Teliti, analitis, praktis", habits: "Perfeksionis, suka mengkritik", compatibility: ["Taurus", "Capricorn"] },
    "Libra": { traits: "Adil, sosial, artistik", habits: "Suka harmoni, sulit memutuskan", compatibility: ["Gemini", "Aquarius"] },
    "Scorpio": { traits: "Penuh gairah, misterius, setia", habits: "Intens, suka kontrol", compatibility: ["Cancer", "Pisces"] },
    "Sagittarius": { traits: "Petualang, optimis, jujur", habits: "Suka kebebasan, blak-blakan", compatibility: ["Aries", "Leo"] },
    "Capricorn": { traits: "Disiplin, ambisius, sabar", habits: "Fokus pada tujuan, serius", compatibility: ["Taurus", "Virgo"] },
    "Aquarius": { traits: "Kreatif, independen, visioner", habits: "Eksentrik, suka kebebasan", compatibility: ["Gemini", "Libra"] },
    "Pisces": { traits: "Empati, imajinatif, romantis", habits: "Suka melamun, sensitif", compatibility: ["Cancer", "Scorpio"] }
};

function getCompatibility(zodiac1, zodiac2) {
    const isCompatible = zodiacTraits[zodiac1].compatibility.includes(zodiac2);
    return {
        status: isCompatible ? "Cocok!" : "Kurang Cocok",
        reason: isCompatible 
            ? `Keduanya saling melengkapi: ${zodiacTraits[zodiac1].traits} cocok dengan ${zodiacTraits[zodiac2].traits}.`
            : `Ada perbedaan yang mencolok: ${zodiacTraits[zodiac1].traits} kurang selaras dengan ${zodiacTraits[zodiac2].traits}.`,
        details: {
            zodiac1: zodiacTraits[zodiac1],
            zodiac2: zodiacTraits[zodiac2]
        }
    };
}

document.getElementById("zodiacForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name1 = document.getElementById("name1").value;
    const day1 = parseInt(document.getElementById("day1").value);
    const month1 = parseInt(document.getElementById("month1").value);
    const year1 = parseInt(document.getElementById("year1").value);
    const name2 = document.getElementById("name2").value;
    const day2 = parseInt(document.getElementById("day2").value);
    const month2 = parseInt(document.getElementById("month2").value);
    const year2 = parseInt(document.getElementById("year2").value);

    const zodiac1 = getZodiac(day1, month1);
    const zodiac2 = getZodiac(day2, month2);
    const compatibility = getCompatibility(zodiac1, zodiac2);

    localStorage.setItem("data", JSON.stringify({ name1, name2, zodiac1, zodiac2, compatibility }));
    window.location.href = "zodiac.html";
});
