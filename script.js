function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
loco()

function mouseEffect() {

    var page1 = document.querySelector(".page-1");
    var cursor = document.querySelector(".cursor");

    page1.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })
    page1.addEventListener("mouseenter", function () {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })
    page1.addEventListener("mouseleave", function () {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })
}
mouseEffect()

function textAnime() {
    gsap.from(".heading h2", {
        y: 120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: ".page-2",
            scroller: ".main",
            start: "top 75%",
            end: "top 81%",
            scrub: 2
        }

    })

    gsap.from(".text h2", {
        y: 150,
        stagger: 0.2,
        duration: 1.3,
        scrollTrigger: {
            trigger: ".page-2",
            scroller: ".main",
            start: "top 45%",
            end: "top 60%",
            scrub:3
        }
    })
    gsap.from(".page-3>h1", {
        y:250,
        stagger:0.2,
        delay:10,
        duration:1.2,
        scrollTrigger: {
            trigger: ".page-3",
            scroller: ".main",
            start: "top 95%",
            end: "top 80%",
            scrub:2
        }
    })

    gsap.from(".heading-1 h2", {
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger: {
            trigger: ".page-5",
            scroller: ".main",
            start: "top 65%",
            end: "top 40%",
            scrub:2
        }
    })
    gsap.from(".text-1 h2", {
        y: 150,
        stagger: 0.2,
        duration: 1.3,
        scrollTrigger: {
            trigger: ".page-5",
            scroller: ".main",
            start: "top 60%",
            end: "top 60%",
            scrub:3
        }
    })

}
textAnime()

