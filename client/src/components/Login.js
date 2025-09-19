import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, Lock, Mail, User, ChevronDown, Eye, EyeClosed } from "lucide-react";

/**
 * SuitcaseAuth
 * A single-file, production-ready React component.
 * - TailwindCSS for styling
 * - Framer Motion for animations
 * - No external UI kit required
 *
 * Tip: Drop this into any React/Vite app with Tailwind configured.
 */
const Login = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    password:false,
    confirm:false,
  });

  // Simple form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
  // clear inputs and visibility state on mode switch
  // setForm({ name: "", email: "", password: "", confirm: "" });
  setShow({ password: false, confirm: false });
  }, [mode]);

  const isSignup = mode === "signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate request
    setTimeout(() => {
      setLoading(false);
      alert(`${isSignup ? "Signed up" : "Logged in"} as ${form.email}`);
      setMode("login");
    }, 800);
  };

  const lidVariants = {
    closed: { rotateX: 0, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
    open: { rotateX: -65, y: -6, transition: { type: "spring", stiffness: 120, damping: 18 } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 24 },
    in: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
  };

  const formStack = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.08 * i, type: "spring", stiffness: 180, damping: 18 },
    }),
    exit: { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.12 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="in"
        className="relative w-full max-w-md"
      >

        {/* Suitcase */}
        <div className="relative perspective-[1200px]">
          {/* Header Controls */}
          <div className="absolute -top-10 left-6 text-slate-200 text-xl font-semibold">
            Welcome
          </div>

          {/* Right text (Dynamic Create/Sign in) */}
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute -top-7 right-6 text-slate-400 text-sm"
          >
            {isSignup ? "Create your account" : "Sign in to continue"}
          </motion.div>
          {/* Base box */}
          <motion.div
            initial={false}
            animate={{ minHeight: isSignup ? 600 : 0 }} // smoothly animate minHeight
            transition={{ type: "spring", stiffness: 80, damping: 2, duration: 0.8, ease: "easeInOut" }}
            className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 pt-14"
          >
            {/* Handle */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <div className="h-8 w-28 rounded-b-2xl rounded-t-lg bg-slate-700 border-x border-b border-white/10" />
            </div>

            {/* Latches */}
            <div className="absolute top-6 left-7 h-2 w-8 rounded bg-white/20" />
            <div className="absolute top-6 right-7 h-2 w-8 rounded bg-white/20" />

            {/* Lid */}
            <motion.div
              className="absolute left-0 right-0 top-0 origin-top bg-slate-700 border border-white/10 rounded-t-2xl h-12"
              variants={lidVariants}
              animate={open ? "open" : "closed"}
              style={{ transformStyle: "preserve-3d" }}
            />

            {/* Lid label (independent of transforms) */}
            <div className="absolute left-1/2 -translate-x-1/2 text-slate-300 text-xs tracking-widest pointer-events-none transition-all duration-300 ease-in-out"
             style={{ top: open ? "-4px" : "15px", }}>
              {open ? "OPEN" : "LOCKED"}
            </div>

            {/* Inner lining */}
            <div className={`rounded-xl bg-gradient-to-b from-slate-900/40 to-slate-900/10 p-4 border border-white/5
            ${isSignup ? "min-h-[520px]" : ""}`}>
              {/* Toggle open/close */}
              <button
                onClick={() => setOpen(!open)}
                className="group w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition py-2 mb-3"
              >
                <span className="text-sm text-slate-200">
                  {open ? "Close suitcase" : "Open suitcase"}
                </span>
                <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
              </button>

              {/* Contents that pop out */}
              <div className="relative h-[360px] overflow-visible">
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.form
                      key={mode}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 18 } }}
                      exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
                      className="left-0 right-0 mx-auto w-full max-w-sm z-10"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Floating card (the part that pops out) */}
                      <motion.div
                        initial={{ y: 24, scale: 0.98, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                        animate={{ y: -6, scale: 1, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
                        transition={{ type: "spring", stiffness: 140, damping: 16 }}
                        className="rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-5"
                      >
                        <div className="grid gap-3">
                          <AnimatePresence initial={false}>
                            {isSignup && (
                              <motion.label
                                key="name"
                                custom={0}
                                variants={formStack}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="block"
                              >
                                <span className="text-slate-300 text-sm mb-1 block">Full Name</span>
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  <input
                                    required={isSignup}
                                    type="text"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20"
                                  />
                                </div>
                              </motion.label>
                            )}
                          </AnimatePresence>

                          <motion.label custom={1} variants={formStack} initial="hidden" animate="show" className="block">
                            <span className="text-slate-300 text-sm mb-1 block">Email</span>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <input
                                required
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20"
                              />
                            </div>
                          </motion.label>

                          <motion.label custom={2} variants={formStack} initial="hidden" animate="show" className="block">
                            <span className="text-slate-300 text-sm mb-1 block">Password</span>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <input
                                required
                                type={show.password ? "text":"password"}
                                placeholder="•••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20"
                              />
                              <button
                                type="button"
                                onClick={() => setShow({ ...show, password:!show.password})}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                              >
                                {show.password ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeClosed className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </motion.label>

                          <AnimatePresence initial={false}>
                            {isSignup && (
                              <motion.label
                                key="confirm"
                                custom={3}
                                variants={formStack}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="block"
                              >
                                <span className="text-slate-300 text-sm mb-1 block">Confirm Password</span>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  <input
                                    required={isSignup}
                                    type={show.confirm ? "text":"password"}
                                    placeholder="•••••••••"
                                    value={form.confirm}
                                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShow({ ...show, confirm:!show.confirm})}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                  >
                                    {show.confirm ? (
                                      <Eye className="h-4 w-4" />
                                    ) : (
                                      <EyeClosed className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </motion.label>
                            )}
                          <div className="mt-1 text-xs text-slate-400 text-left">
                            <button
                              type="button"
                              className="hover:text-slate-300 underline underline-offset-2"
                            >Forgot Password</button>
                          </div>
                          </AnimatePresence>
          
                          <motion.button
                            custom={4}
                            variants={formStack}
                            initial="hidden"
                            animate="show"
                            type="submit"
                            disabled={loading}
                            className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 bg-white text-slate-900 font-medium shadow-lg shadow-black/20 disabled:opacity-70 active:scale-[0.99]"
                          >
                            {loading ? (
                              <span className="animate-pulse">Processing…</span>
                            ) : (
                              <>
                                {isSignup ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                                {isSignup ? "Create Account" : "Login"}
                              </>
                            )}
                          </motion.button>
                        </div>

                        {/* Tiny helper */}
                        <div className="mt-3 text-xs text-slate-400 text-center">
                          {isSignup ? (
                            <button
                              type="button"
                              onClick={() => setMode("login")}
                              className="underline underline-offset-2 hover:text-slate-300"
                            >
                              Already have an account? Sign in
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setMode("signup")}
                              className="underline underline-offset-2 hover:text-slate-300"
                            >
                              New here? Create an account
                            </button>
                          )}
                        </div>
                      </motion.div>

                      {/* Subtle 3D shadow below the floating card */}
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, y: 0, scale: 0.85 }}
                        animate={{ opacity: 1, y: 12, scale: 1 }}
                        transition={{ delay: 0.15 }}
                        className="mx-auto mt-6 h-6 w-40 rounded-full bg-black/40 blur-xl"
                      />
                    </motion.form>
                  ) : (
                    // Closed suitcase placeholder
                    <motion.div
                      key="closed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-slate-400"
                    >
                      <div className="text-sm opacity-80">Open the suitcase to access the form</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Tip: toggle open to interact with the suitcase.
        </div>
      </motion.div>
    </div>
  );
}

export default Login;