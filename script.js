// SupperCalendar - Interactive Seasonal Gastronomy Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrollPercent = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    // Back to top button
    const backBtn = document.getElementById('backToTopBtn');
    if (backBtn) {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }
  });

  const backBtn = document.getElementById('backToTopBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Dark / Light Mode Switcher
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('suppercalendar_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.textContent = 'Hearth Light';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('suppercalendar_theme', 'light');
        themeToggleBtn.textContent = 'Hearth Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('suppercalendar_theme', 'dark');
        themeToggleBtn.textContent = 'Hearth Light';
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('open') ? '&times;' : '&#9776;';
    });
  }

  // 4. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(el => el.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 5. Interactive Seasonal Supper Calendar Simulator
  const seasonBtns = document.querySelectorAll('.season-btn');
  const course1Title = document.getElementById('course1Title');
  const course1Desc = document.getElementById('course1Desc');
  const course2Title = document.getElementById('course2Title');
  const course2Desc = document.getElementById('course2Desc');
  const course3Title = document.getElementById('course3Title');
  const course3Desc = document.getElementById('course3Desc');
  const course4Title = document.getElementById('course4Title');
  const course4Desc = document.getElementById('course4Desc');
  const course5Title = document.getElementById('course5Title');
  const course5Desc = document.getElementById('course5Desc');
  const seasonHeadingDisplay = document.getElementById('seasonHeadingDisplay');
  const seasonSpecsDisplay = document.getElementById('seasonSpecsDisplay');
  const dialHarmony = document.getElementById('dialHarmony');
  const dialCourses = document.getElementById('dialCourses');

  const seasonalMenus = {
    autumn: {
      heading: "Autumn Hearth & Foraged Fungi Tasting",
      specs: "A 5-course immersion celebrating ember-roasted Delicata squash, foraged Matsutake mushrooms, cultured sheep's curd, and slow-braised root garums.",
      harmony: "99%",
      coursesCount: "5 Courses",
      c1: { title: "Charred Chestnut Amuse", desc: "Whipped smoked mountain butter, roasted pine essence, toasted rye crisp." },
      c2: { title: "Heirloom Parsnip Crudo", desc: "Thinly shaved parsnip ribbons, fermented quince vinaigrette, wild sorrel." },
      c3: { title: "Hearth-Roasted Hen of Woods", desc: "Maitake clusters over ember-cooked barley broth and black garlic emulsion." },
      c4: { title: "Spelt & Emmer Sourdough", desc: "Stone-ground ancient heritage grains with cultured 60-day botanical butter." },
      c5: { title: "Roasted Apple & Hay Tart", desc: "Smoked orchard apple compote, toasted birch bark cream, chamomile reduction." }
    },
    winter: {
      heading: "Winter Solstice & Root Preservation Tasting",
      specs: "Deep umami profiles highlighting aged koji ferments, caramelized winter cabbages, roasted bone broths, and preserved orchard syrups.",
      harmony: "98%",
      coursesCount: "5 Courses",
      c1: { title: "Caramelized Sunchoke Velouté", desc: "Roasted hazelnut oil, shaved black winter truffle, crispy sunchoke skin." },
      c2: { title: "Preserved Winter Citrus Salad", desc: "Blood orange segments, pickled golden beets, shaved fennel, bitter radicchio." },
      c3: { title: "Slow-Braised Celery Root", desc: "Salt-baked whole celeriac steak, roasted vegetable demiglace, smoked sea salt." },
      c4: { title: "Dark Rye Country Sourdough", desc: "Caraway-infused artisan bread served with cultured tallow butter." },
      c5: { title: "Smoked Juniper & Dark Cocoa", desc: "Single-origin chocolate ganache, infused juniper pine snow, roasted pear." }
    },
    spring: {
      heading: "Spring Equinox & Foraged Green Shoot Tasting",
      specs: "Vibrant, mineral-rich creations showcasing wild ramps, tender nettles, sweet spring peas, green strawberries, and floral hydrosols.",
      harmony: "99%",
      coursesCount: "5 Courses",
      c1: { title: "Wild Ramp & Chive Broth", desc: "Clarified spring vegetable consommé with tender ramp oil pearls." },
      c2: { title: "Shaved Asparagus & Pea Shoots", desc: "Raw English green peas, mint-infused lemon emulsion, aged hard cheese shavings." },
      c3: { title: "Morel Mushroom Tartine", desc: "Pan-roasted spring morels over creamy goat curd on toasted brioche." },
      c4: { title: "Herb-Laminated Sourdough", desc: "Infused with fresh tarragon and chervil, whipped cultured sea salt butter." },
      c5: { title: "Rhubarb & Sweet Woodruff", desc: "Poached pink garden rhubarb, woodruff ice, roasted oat crumble." }
    },
    summer: {
      heading: "Summer Solstice & Heirloom Tomato Garden Tasting",
      specs: "High-acidity, sun-drenched flavors featuring 12 heirloom tomato varieties, charred sweet corn, fragrant basil oils, and stone fruit compotes.",
      harmony: "97%",
      coursesCount: "5 Courses",
      c1: { title: "Clarified Tomato Water Gazpacho", desc: "Cucumber ribbons, lemon verbena oil, frozen tomato ice pearls." },
      c2: { title: "Heirloom Tomato & Peach Carpaccio", desc: "Cherokee Purple and Green Zebra slices, torn sweet basil, toasted buckwheat." },
      c3: { title: "Charred Sweet Corn Agnolotti", desc: "Handmade pasta pockets filled with sweet corn purée, sage butter, chanterelles." },
      c4: { title: "Golden Semolina Focaccia", desc: "Dimpled with rosemary and sea salt, served with cold-pressed olive oil." },
      c5: { title: "Wild Blackberry & Lemon Verbena", desc: "Macerated foraged blackberries, toasted almond cake, lemon verbena gelato." }
    }
  };

  seasonBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      seasonBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sKey = btn.getAttribute('data-season');
      const data = seasonalMenus[sKey];
      if (data) {
        if (seasonHeadingDisplay) seasonHeadingDisplay.textContent = data.heading;
        if (seasonSpecsDisplay) seasonSpecsDisplay.textContent = data.specs;
        if (dialHarmony) dialHarmony.textContent = data.harmony;
        if (dialCourses) dialCourses.textContent = data.coursesCount;

        if (course1Title) course1Title.textContent = data.c1.title;
        if (course1Desc) course1Desc.textContent = data.c1.desc;
        if (course2Title) course2Title.textContent = data.c2.title;
        if (course2Desc) course2Desc.textContent = data.c2.desc;
        if (course3Title) course3Title.textContent = data.c3.title;
        if (course3Desc) course3Desc.textContent = data.c3.desc;
        if (course4Title) course4Title.textContent = data.c4.title;
        if (course4Desc) course4Desc.textContent = data.c4.desc;
        if (course5Title) course5Title.textContent = data.c5.title;
        if (course5Desc) course5Desc.textContent = data.c5.desc;
      }
    });
  });

  // 6. Botanical Pairing Matrix Simulator
  const pairingTabBtns = document.querySelectorAll('.pairing-tab-btn');
  const pairElixirName = document.getElementById('pairElixirName');
  const pairBotanicals = document.getElementById('pairBotanicals');
  const pairAcidityProfile = document.getElementById('pairAcidityProfile');
  const pairTastingNote = document.getElementById('pairTastingNote');
  const pairMatchingCourse = document.getElementById('pairMatchingCourse');

  const pairingData = {
    hydrosol: {
      name: "Wild Pine Needle & Meyer Lemon Hydrosol",
      botanicals: "Steam-distilled Eastern white pine needles, cold-pressed Meyer lemon peel, elderflower.",
      acidity: "Bright & Crisp (pH 3.6)",
      tastingNote: "Resinous alpine freshness with delicate floral acidity that cuts through rich broths.",
      course: "Amuse-Bouche & Light Chilled Shellfish / Vegetable Crudo."
    },
    tea: {
      name: "Cold-Drip Smoked Lapsang & Roasted Barley",
      botanicals: "18-hour cold-brewed Wuyi mountain black tea, roasted organic highland barley, dried orange peel.",
      acidity: "Earthy & Tannic (pH 5.2)",
      tastingNote: "Smoky campfire warmth with toasted cereal grain sweetness that mirrors wood-fired meats.",
      course: "Hearth-Roasted Hen of the Woods & Braised Root Vegetables."
    },
    verjus: {
      name: "Fermented Green Apple & Chamomile Verjus",
      botanicals: "Unripened Granny Smith apple juice, fermented chamomile flower tea, white tea reduction.",
      acidity: "Tart & Complex (pH 3.2)",
      tastingNote: "Electrifying natural malic acidity softened by soothing herbal honey notes.",
      course: "Rich Aged Cheeses, Heirloom Sourdough & Roasted Root Courses."
    },
    tonic: {
      name: "Birch Bark & Toasted Cardamom Elixir",
      botanicals: "Simmered sweet birch bark, green cardamom pods, toasted coriander, sparkling spring water.",
      acidity: "Warm & Aromatic (pH 4.5)",
      tastingNote: "Sweet wintergreen aroma with exotic spiced warmth that cleanses the palate.",
      course: "Roasted Stone Fruit Desserts, Dark Single-Origin Chocolate Ganaches."
    }
  };

  pairingTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pairingTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pKey = btn.getAttribute('data-pair');
      const d = pairingData[pKey];
      if (d) {
        if (pairElixirName) pairElixirName.textContent = d.name;
        if (pairBotanicals) pairBotanicals.textContent = d.botanicals;
        if (pairAcidityProfile) pairAcidityProfile.textContent = d.acidity;
        if (pairTastingNote) pairTastingNote.textContent = d.tastingNote;
        if (pairMatchingCourse) pairMatchingCourse.textContent = d.course;
      }
    });
  });

  // 7. Blog Instant Search & Category Filter (for blog.html)
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogCategoryBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.editorial-card-item');

  function filterBlogPosts() {
    const query = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';
    const activeCategory = document.querySelector('.blog-filter-btn.active')?.getAttribute('data-category') || 'all';

    blogCards.forEach(card => {
      const cardTitle = card.querySelector('.editorial-card-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.editorial-card-desc')?.textContent.toLowerCase() || '';
      const cardCat = card.getAttribute('data-category') || '';

      const matchesQuery = !query || cardTitle.includes(query) || cardDesc.includes(query);
      const matchesCategory = activeCategory === 'all' || cardCat === activeCategory;

      if (matchesQuery && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterBlogPosts);
  }

  blogCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogCategoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterBlogPosts();
    });
  });

  // 8. Table Reservation Form Handling
  const tableBookingForm = document.getElementById('tableBookingForm');
  const formSuccessModal = document.getElementById('formSuccessModal');
  if (tableBookingForm) {
    tableBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccessModal) {
        formSuccessModal.style.display = 'block';
      } else {
        alert('Thank you for requesting an evening table reservation. Our Supper Salon Maitre d will confirm within 24 hours.');
      }
      tableBookingForm.reset();
    });
  }
});