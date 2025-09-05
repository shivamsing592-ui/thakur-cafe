import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Coffee, IceCream, Sandwich, CupSoda, Soup, Phone, MapPin, Clock, IndianRupee, Instagram, Facebook, Mail, Music, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// --- MENU DATA ---
const CATEGORIES = [
  { id: "chai", label: "Chai", icon: <Coffee className="h-4 w-4" /> },
  { id: "coffee", label: "Coffee", icon: <Coffee className="h-4 w-4" /> },
  { id: "cold-coffee", label: "Cold Coffee", icon: <CupSoda className="h-4 w-4" /> },
  { id: "shakes", label: "Shakes", icon: <CupSoda className="h-4 w-4" /> },
  { id: "maggi", label: "Maggi", icon: <Soup className="h-4 w-4" /> },
  { id: "sandwich", label: "Sandwich", icon: <Sandwich className="h-4 w-4" /> },
  { id: "ice-cream", label: "Ice-Cream", icon: <IceCream className="h-4 w-4" /> },
];

const MENU = [
  { name: "3C's Special Chai", price: 20, category: "chai" },
  { name: "Ginger Tea", price: 20, category: "chai" },
  { name: "Chai with Bun Maska", price: 49, category: "chai" },
  { name: "3C's Special Coffee", price: 20, category: "coffee" },
  { name: "Hot Coffee", price: 20, category: "coffee" },
  { name: "Coffee with Bun Maska", price: 49, category: "coffee" },
  { name: "CC Kulhad Shot", price: 20, category: "cold-coffee" },
  { name: "Cold Coffee", price: 49, category: "cold-coffee" },
  { name: "Bubblegum Coffee", price: 59, category: "cold-coffee" },
  { name: "Butter Scotch Coffee", price: 59, category: "cold-coffee" },
  { name: "Caramel Coffee", price: 59, category: "cold-coffee" },
  { name: "Vanilla", price: 49, category: "shakes" },
  { name: "Strawberry", price: 59, category: "shakes" },
  { name: "Banana", price: 59, category: "shakes" },
  { name: "Chocolate", price: 69, category: "shakes" },
  { name: "Oreo", price: 69, category: "shakes" },
  { name: "Blueberry", price: 69, category: "shakes" },
  { name: "Plain Maggi", price: 49, category: "maggi" },
  { name: "Veg Maggi", price: 59, category: "maggi" },
  { name: "Cheese Maggi", price: 69, category: "maggi" },
  { name: "Classic American", price: 49, category: "sandwich" },
  { name: "Grill Cheese", price: 59, category: "sandwich" },
  { name: "Vanilla", price: 25, category: "ice-cream" },
  { name: "Strawberry", price: 25, category: "ice-cream" },
  { name: "Chocolate", price: 30, category: "ice-cream" },
  { name: "Butterscotch", price: 30, category: "ice-cream" },
  { name: "Blueberry", price: 30, category: "ice-cream" },
  { name: "Add-on Ice Cream", price: 10, category: "ice-cream", addon: true },
];

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function SectionHeading({ title, subtitle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center space-y-2">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
      <div className="mx-auto h-[3px] w-24 rounded-full bg-yellow-400"></div>
    </motion.div>
  );
}

function MenuCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="bg-white/10 backdrop-blur-lg border-neutral-800 hover:shadow-2xl transition-all">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="min-w-0">
            <p className="font-semibold truncate">{item.name}</p>
            {item.addon && <Badge variant="secondary" className="mt-1">Add-on</Badge>}
          </div>
          <div className="flex items-center gap-1 font-bold">
            <IndianRupee className="h-4 w-4" />
            <span>{item.price}</span>
            <span className="opacity-60">/-</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ThakurCafe() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("chai");
  const [music, setMusic] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const filtered = useMemo(() => {
    return MENU.filter(m => m.category === active && m.name.toLowerCase().includes(query.toLowerCase()));
  }, [active, query]);

  return (
    <div className="min-h-screen text-white relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80')" }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Music Player */}
      <audio autoPlay loop muted={!music} volume={volume}>
        <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_6c3b7b45a3.mp3?filename=coffee-shop-ambient-11090.mp3" type="audio/mpeg" />
      </audio>
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <Button onClick={() => setMusic(!music)} className="rounded-full p-2 bg-yellow-400 text-black">
          {music ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20" />
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="h-10 w-10 rounded-xl bg-yellow-400 text-black grid place-items-center font-black">TC</motion.div>
            <div>
              <h1 className="text-xl font-extrabold leading-tight">Thakur Cafe</h1>
              <p className="text-xs opacity-80 -mt-1">Chai • Coffee • Chaska</p>
            </div>
          </div>

          <div className="w-full md:max-w-md flex items-center gap-2">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu…" className="bg-white/10 border-neutral-700" />
            <Button variant="secondary" className="gap-2"><Search className="h-4 w-4"/>Search</Button>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs opacity-90">
            <div className="flex items-center gap-1"><Clock className="h-4 w-4"/> 8am – 10pm</div>
            <div className="flex items-center gap-1"><Phone className="h-4 w-4"/> +91-6386375746</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-4">
            <p className="text-yellow-400 font-semibold tracking-wider uppercase">Food Menu</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Super Delicious — A taste you’ll remember</h2>
            <p className="text-sm opacity-85 max-w-prose">Once you try it, you will love it. Enjoy fresh brews, hearty snacks and classic shakes in a cozy, family-friendly setting.</p>
            <div className="flex gap-3">
              <a href="#menu"><Button size="lg" className="rounded-2xl">View Menu</Button></a>
              <Button size="lg" variant="secondary" className="rounded-2xl" onClick={() => window.print()}>Print Menu</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative flex flex-col items-center">
            <div className="relative">
              <img src="https://cdn-icons-png.flaticon.com/512/2935/2935465.png" alt="Coffee Cup" className="mx-auto w-32" />
              {/* Steam Animation */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="w-6 h-6 rounded-full bg-white/30 blur-md animate-bounce-slow" style={{ animationDelay: `${i * 0.5}s` }}></span>
                ))}
              </div>
            </div>
            {/* Gradient Glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-yellow-500/30 via-pink-500/30 to-purple-500/30 blur-3xl rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <nav id="menu" className="sticky top-[57px] z-30 bg-black/60 backdrop-blur border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <motion.button whileTap={{ scale: 0.9 }} key={c.id} onClick={() => setActive(c.id)} className={classNames(
              "px-4 py-2 rounded-2xl border transition-all whitespace-nowrap flex items-center gap-2",
              active === c.id ? "bg-yellow-400 text-black border-yellow-400" : "bg-white/10 border-neutral-700 hover:border-neutral-500"
            )} aria-pressed={active === c.id}>
              {c.icon}
              <span className="font-semibold">{c.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Menu Grid */}
      <main className="relative max-w-6xl mx-auto px-4 py-10 space-y-14">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className={active === cat.id ? "block" : "hidden"}>
            <SectionHeading title={cat.label} subtitle="Fresh • Tasty • Hygienic" />
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.length
                ? filtered.map((item) => <MenuCard key={item.name + item.category} item={item} />)
                : MENU.filter(m => m.category === cat.id).map((item) => <MenuCard key={item.name + item.category} item={item} />)}
            </motion.div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-black/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg">Thakur Cafe</h3>
            <p className="text-sm opacity-85 mt-2">Thank you, please visit again.</p>
            <div className="mt-3 flex gap-2 text-xs opacity-80">
              <Badge className="bg-green-600">Veg Friendly</Badge>
              <Badge variant="secondary">Cash & UPI</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-2 space-y-1 text-sm opacity-90">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> +91-6386375746</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> Shivamsing592@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Pachdeora Atrampur Prayagraj</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4"/> 8:00 AM – 10:00 PM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow</h4>
            <div className="mt-2 flex gap-3">
              <a className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100" href="#"><Instagram className="h-4 w-4"/> Instagram</a>
              <a className="inline-flex items-center gap-2 text-sm opacity-90 hover:opacity-100" href="#"><Facebook className="h-4 w-4"/> Facebook</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs opacity-60 py-6">© {new Date().getFullYear()} Thakur Cafe. All rights reserved.</div>
      </footer>
    </div>
  );
}
