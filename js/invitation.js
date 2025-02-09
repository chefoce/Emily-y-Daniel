document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.querySelector(".envelope-wrapper");
  const openedEnvelope = document.querySelector(".opened-envelope");
  const invitationInstructions = document.querySelector(
    ".invitation-instructions"
  );
  const indexContent = document.getElementById("index-content");
  const invitationContent = document.getElementById("invitation-content");
  const body = document.querySelector("body");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const musicToggle = document.querySelector(".music-toggle");
  let isPlaying = false;

  // Función para desplazar la página hasta arriba
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  // Llamar a la función cuando se carga la página
  //scrollToTop();

  // También puedes agregar un evento para cuando se recarga la página
  window.addEventListener("beforeunload", scrollToTop);

  // Add CSS classes for transitions
  invitationInstructions.classList.add("fade-transition");
  openedEnvelope.classList.add("fade-transition");

  var openLetter = gsap.timeline({ paused: true });
  openLetter
    .to(".opened-envelope", {
      duration: 0.5,
      ease: "back",
      rotateX: 180,
      transformOrigin: "top",
      zIndex: 0,
    })
    .set(".opened-envelope", { cssRule: { marginTop: "-10px" } })
    .to(".letter", {
      duration: 1,
      ease: "back",
      translateY: -200,
    })
    .set(".letter", { zIndex: 99 })
    .to(".letter", {
      duration: 0.7,
      ease: "back",
      translateY: 0,
      scale: 1.2,
    });

  envelopeWrapper.addEventListener("click", (event) => {
    event.stopPropagation();
    openLetter.play();

    // Fade out the invitation instructions
    invitationInstructions.style.opacity = "0";
    openedEnvelope.style.opacity = "0";

    // Remove the element from the DOM after the transition
    setTimeout(() => {
      openedEnvelope.style.display = "none";
      backgroundMusic.play();
    }, 1000); // 1000ms = 1 second (should match the transition duration)

    setTimeout(function () {
      indexContent.style.display = "none";
      body.style.overflow = "visible";
      invitationContent.style.visibility = "visible";
      invitationContent.style.opacity = "1";
    }, 4000);
  });
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      backgroundMusic.pause();
      musicToggle.classList.remove("mdi-pause");
      musicToggle.classList.add("mdi-play");
    } else {
      backgroundMusic.play();
      musicToggle.classList.remove("mdi-play");
      musicToggle.classList.add("mdi-pause");
    }
    isPlaying = !isPlaying;
  });
  // Actualizar el ícono cuando la música comience a reproducirse
  backgroundMusic.addEventListener("play", function () {
    isPlaying = true;
    musicToggle.classList.remove("mdi-play");
    musicToggle.classList.add("mdi-pause");
  });

  // Actualizar el ícono cuando la música se pause
  backgroundMusic.addEventListener("pause", function () {
    isPlaying = false;
    musicToggle.classList.remove("mdi-pause");
    musicToggle.classList.add("mdi-play");
  });
});
