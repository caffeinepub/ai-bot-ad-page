import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Globe,
  Menu,
  MessageSquare,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Stagger variant helpers ────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ─── Navbar ─────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/uploads/IMG_202603021347111692-1-1.png"
            alt="AuraEdge logo"
            className="h-9 w-9 object-contain"
          />
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Aura<span className="text-shimmer">Edge</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Stats", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="btn-outline-teal text-sm font-medium px-4 py-2 rounded-lg"
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn-primary-glow text-sm font-semibold px-5 py-2 rounded-lg flex items-center gap-1.5"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {["Features", "Stats", "Pricing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
              <button
                type="button"
                className="btn-primary-glow text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 w-full"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Atmospheric glow */}
      <div className="hero-glow absolute inset-0 pointer-events-none" />

      {/* Glowing orb behind logo */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.75 0.16 195 / 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium font-body border border-teal/30 bg-teal/5 text-teal-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-glow animate-pulse" />
              Now available — Powered by next-gen AI
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="float-anim pulse-glow-anim rounded-2xl overflow-hidden"
          >
            <img
              src="/assets/uploads/IMG_202603021347111692-1-1.png"
              alt="AuraEdge"
              className="w-24 h-24 object-contain"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            The Edge You <br className="hidden sm:block" />
            <span className="text-shimmer">Always Needed</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            AuraEdge understands context, learns your preferences, and delivers
            instant intelligent responses — so you can focus on what actually
            matters. This app is powered by Aura Bot and is compatible with the
            Aura Bot robot.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://aura-bot-companion--pardeshilata198.replit.app",
                  "_blank",
                )
              }
              className="btn-primary-glow font-semibold px-8 py-3 rounded-xl flex items-center gap-2 text-base w-full sm:w-auto justify-center"
            >
              Try for Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="btn-outline-teal font-medium px-8 py-3 rounded-xl text-base w-full sm:w-auto justify-center flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Learn More
            </button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-muted-foreground font-body"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-teal text-teal" />
              ))}
            </div>
            <span>Trusted by 10M+ teams worldwide</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.1 0.005 240))",
        }}
      />
    </section>
  );
}

// ─── Feature Card ────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}

function FeatureCard({ icon, title, description, detail }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="card-hover relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 overflow-hidden"
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, oklch(0.75 0.16 195 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal teal-glow-sm">
        {icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display font-bold text-xl text-foreground">
          {title}
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>

      <ul className="flex flex-col gap-1.5 mt-auto">
        {detail.split("|").map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs font-body text-muted-foreground"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
            {item.trim()}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Features Section ────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Smart Replies",
      description:
        "Instant, intelligent responses available around the clock. No delays, no downtime — just accurate answers when you need them.",
      detail:
        "Sub-50ms response time | Context-aware suggestions | Natural language understanding",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Easy Integration",
      description:
        "Connect to any platform in minutes with our developer-friendly API and 50+ pre-built connectors.",
      detail:
        "REST & WebSocket API | Slack, Discord, WhatsApp | One-line embed script",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Always Learning",
      description:
        "AuraEdge adapts to your brand voice and gets smarter with every conversation, continuously improving over time.",
      detail:
        "Personalized knowledge base | Feedback-driven refinement | Custom training",
    },
  ];

  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-teal font-body text-sm font-semibold uppercase tracking-widest mb-3"
          >
            What makes us different
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-display font-extrabold text-4xl sm:text-5xl text-foreground leading-tight"
          >
            Built for the way <span className="text-shimmer">you work</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 font-body text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Three core capabilities that set AuraEdge apart from every other AI
            solution.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats Bar ───────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "10M+", label: "Active Users" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "50+", label: "Languages" },
    { value: "<50ms", label: "Avg. Response" },
  ];

  return (
    <section id="stats" className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="bg-card flex flex-col items-center justify-center py-10 px-6 gap-1.5 relative group overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.75 0.16 195 / 0.06) 0%, transparent 70%)",
                }}
              />
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-shimmer">
                {s.value}
              </span>
              <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.75 0.16 195 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="flex flex-col items-center gap-7"
        >
          <motion.div variants={itemVariants}>
            <img
              src="/assets/uploads/IMG_202603021347111692-1-1.png"
              alt="AuraEdge"
              className="w-16 h-16 object-contain opacity-80"
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="font-display font-extrabold text-4xl sm:text-5xl text-foreground leading-tight"
          >
            Start your free trial <span className="text-shimmer">today</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-body text-muted-foreground text-lg max-w-xl"
          >
            Join over 10 million users who trust AuraEdge to handle their
            conversations. No credit card required.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://aura-bot-companion--pardeshilata198.replit.app",
                  "_blank",
                )
              }
              className="btn-primary-glow font-semibold px-10 py-3.5 rounded-xl flex items-center gap-2 text-base justify-center"
              data-ocid="cta.primary_button"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="btn-outline-teal font-medium px-8 py-3.5 rounded-xl text-base flex items-center gap-2 justify-center"
            >
              View Pricing
            </button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-xs font-body text-muted-foreground"
          >
            14-day free trial · No credit card · Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/IMG_202603021347111692-1-1.png"
              alt="AuraEdge"
              className="h-7 w-7 object-contain opacity-75"
            />
            <div>
              <p className="font-display font-bold text-foreground">AuraEdge</p>
              <p className="text-xs font-body text-muted-foreground">
                Powered by Aura Bot · Compatible with Aura Bot Robot
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {(
              [
                { label: "Privacy", href: "#privacy" },
                { label: "Terms", href: "#terms" },
                { label: "Docs", href: "#docs" },
                { label: "Blog", href: "#blog" },
              ] as { label: string; href: string }[]
            ).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs font-body text-muted-foreground text-center">
            © {year}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <FeaturesSection />
        <StatsBar />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
