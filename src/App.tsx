import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, animate } from 'motion/react';
import { 
  Menu, X, ChevronRight, Star, MapPin, Phone, Mail, 
  Instagram, Facebook, MessageCircle, Clock, Shield, Sparkles, 
  CheckCircle2, ArrowRight, ChevronDown, Award
} from 'lucide-react';

const WHATSAPP_NUMBER = "5527999975993"; // Updated number
const WHATSAPP_MESSAGE = "Olá! Gostaria de agendar uma avaliação com o Dr. Artur Cirilo.";

// --- Animated Counter Component ---
function AnimatedCounter({ from, to, duration = 1.2, format = (v: number) => v.toString() }: { from: number, to: number, duration?: number, format?: (v: number) => string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = format(value);
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]); // Removed format from dependencies to prevent re-triggering on parent re-renders

  return <span ref={nodeRef}>{format(from)}</span>;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-ice text-deep-blue font-sans selection:bg-cyan-soft/30">
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-12 h-12 bg-cyan-soft rounded-full overflow-hidden border-2 border-cyan-soft/30 shadow-sm flex-shrink-0">
                <img 
                  src="https://lh3.googleusercontent.com/d/1ZCBD_e4_Z1DD_h_cEYDyAeqcmTFVEjn0" 
                  alt="Dr. Artur Cirilo" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl tracking-tight leading-none text-deep-blue">Dr. Artur Cirilo</h1>
                <p className="text-xs text-silver font-bold tracking-wider uppercase mt-0.5">Odontologia Avançada</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-slate-50/80 backdrop-blur-sm border border-slate-100 p-1 rounded-full shadow-sm">
              {['Diferencial', 'Serviços', 'Sobre', 'Depoimentos', 'FAQ'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-xs lg:text-sm font-semibold text-slate-600 hover:text-cyan-text px-4 py-2 rounded-full hover:bg-white hover:shadow-sm transition-all duration-300"
                >
                  {item}
                </button>
              ))}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-soft text-deep-blue hover:bg-deep-blue hover:text-white font-bold py-2 px-5 rounded-full transition-all duration-300 text-xs lg:text-sm ml-1"
              >
                Agendar Avaliação
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-deep-blue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg border-t border-silver/10 py-4 px-4 flex flex-col gap-4 md:hidden"
            >
              {['Diferencial', 'Serviços', 'Sobre', 'Depoimentos', 'FAQ'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-lg font-semibold text-deep-blue py-4 border-b border-slate-50"
                >
                  {item}
                </button>
              ))}
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-4"
              >
                Agendar Avaliação
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-16 md:pt-20 overflow-hidden bg-ice">
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY }} className="w-full h-full">
            <img 
              src="https://lh3.googleusercontent.com/d/1deSOCFcFbrQJRsmG1yVsEIIF0fWS6UMp" 
              alt="Sorriso natural e confiante" 
              className="w-full h-full object-cover object-center opacity-40"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ice via-ice/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-soft/10 border border-cyan-soft/30 text-cyan-text text-sm font-bold mb-6 tracking-wide">
                <Shield size={14} className="text-cyan-text" />
                <span>Odontologia Digital e Reabilitação</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-deep-blue">
                Recupere a liberdade de sorrir em <span className="text-cyan-text">tempo recorde</span>.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                Transforme sua qualidade de vida com dentes fixos e estética impecável, com precisão digital e sem a necessidade de enxertos ósseos complexos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 text-lg"
                >
                  Agendar Avaliação <ArrowRight size={20} />
                </a>
              </div>

              <div className="mt-12 flex items-center gap-6 md:gap-8">
                <div className="flex -space-x-3 flex-shrink-0">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Paciente" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex text-cyan-text mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                  </div>
                  <p className="text-slate-600 font-bold leading-tight">Centenas de sorrisos transformados</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="relative z-20 -mt-8 md:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cyan-soft/10 backdrop-blur-xl border border-cyan-soft/30 shadow-lg rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-silver/20">
          <div className="text-center px-4 py-4 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-text mb-1 md:mb-2 font-heading">
              +<AnimatedCounter from={0} to={5000} format={(v) => Math.round(v).toLocaleString('pt-BR')} />
            </h3>
            <p className="text-deep-blue font-bold text-sm md:text-base">Implantes Realizados</p>
          </div>
          <div className="text-center px-4 py-8 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-text mb-1 md:mb-2 font-heading">
              <AnimatedCounter from={0} to={5} duration={1} format={(v) => v.toFixed(1)} />
            </h3>
            <p className="text-deep-blue font-bold text-sm md:text-base">Estrelas no Google</p>
          </div>
          <div className="text-center px-4 py-8 md:py-0">
            <h3 className="text-3xl md:text-4xl font-bold text-cyan-text mb-1 md:mb-2 font-heading">
              <AnimatedCounter from={0} to={100} duration={1.2} format={(v) => Math.round(v).toString() + '%'} />
            </h3>
            <p className="text-deep-blue font-bold text-sm md:text-base">Carga Imediata*</p>
            <p className="text-[10px] md:text-xs text-slate-500 mt-1 font-medium">*Em casos selecionados</p>
          </div>
        </div>
      </section>

      {/* --- Technical Differential (A Revelação) --- */}
      <section id="diferencial" className="py-20 md:py-24 bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tecnologia de Dentes Fixos <span className="text-cyan-text">Sem Enxerto</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                Esqueça os tratamentos longos, dolorosos e que exigem meses de espera. Com técnicas avançadas de implantodontia e planejamento digital 3D, conseguimos reabilitar o seu sorriso de forma mais rápida, segura e menos invasiva.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Menos Invasivo", desc: "Técnicas que aproveitam o osso existente, evitando cirurgias de enxerto complexas." },
                  { title: "Recuperação Acelerada", desc: "Procedimentos otimizados para que você volte à sua rotina o mais rápido possível." },
                  { title: "Resultados Imediatos", desc: "Possibilidade de sair com dentes fixos provisórios no mesmo dia da cirurgia (Carga Imediata)." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-soft/10 flex items-center justify-center text-cyan-text">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-deep-blue mb-1">{item.title}</h4>
                      <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-silver/20">
                <img 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Tecnologia Odontológica" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <Shield className="text-cyan-text" size={28} />
                  <h4 className="font-bold text-lg text-deep-blue">Segurança Digital</h4>
                </div>
                <p className="text-sm text-slate-600 font-medium">Planejamento virtual 3D para precisão milimétrica em cada implante.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="servicos" className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 md:mb-16 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-cyan-soft rounded-full hidden md:block"></div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-cyan-text font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Tratamentos</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-deep-blue leading-tight">Soluções de <br className="hidden md:block" /> Excelência</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Tratamentos personalizados com materiais de altíssima qualidade para garantir durabilidade, função e estética incomparáveis.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Shield size={32} />,
                title: "Implantes Dentários",
                desc: "Substituição segura e definitiva para dentes perdidos. Devolvemos sua função mastigatória e a estética do sorriso com implantes de titânio de alta tecnologia."
              },
              {
                icon: <Star size={32} />,
                title: "Prótese Protocolo",
                desc: "A solução ideal e definitiva para quem usa dentadura. Dentes fixos sobre implantes que não machucam, não soltam e devolvem 100% da sua confiança."
              },
              {
                icon: <Sparkles size={32} />,
                title: "Facetas Estéticas",
                desc: "Correção de cor, formato e alinhamento para um sorriso de celebridade. Lentes de contato dental e facetas em resina ou porcelana com extrema naturalidade."
              },
              {
                icon: <CheckCircle2 size={32} />,
                title: "Clínica Geral & Prevenção",
                desc: "Cuidados essenciais, limpezas profundas e manutenções para garantir que a saúde do seu novo sorriso permaneça impecável ao longo dos anos."
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-silver/20 bg-ice hover:border-cyan-soft/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-cyan-text mb-6 group-hover:scale-110 transition-transform duration-300 border border-silver/10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-deep-blue">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="sobre" className="py-20 md:py-24 bg-ice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-silver/20 bg-slate-200">
                <img 
                  src="https://lh3.googleusercontent.com/d/1-q_JDRyVULji78JCOjBiGawVHKhMoUo7" 
                  alt="Dr. Artur Cirilo" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  opacity: { duration: 0.8 },
                  x: { duration: 0.8 }
                }}
                className="absolute -left-16 bottom-12 bg-white/30 backdrop-blur-xl p-5 rounded-3xl flex items-center gap-5 hidden md:flex shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50 z-10 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-soft to-cyan-hover rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-soft/40 flex-shrink-0 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                  <Award size={32} />
                </div>
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-soft text-deep-blue mb-2 shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]">Avaliação Máxima</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-4xl text-deep-blue tracking-tighter">5.0</span>
                    <div className="flex text-cyan-text gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                    </div>
                  </div>
                </div>
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-3xl bg-cyan-soft/10 blur-2xl -z-10 opacity-50"></div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-cyan-soft rounded-full hidden md:block"></div>
              <span className="text-cyan-text font-bold text-xs tracking-[0.2em] uppercase mb-4 block">O Especialista</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-deep-blue">Dr. Artur Nunes Cirilo</h2>
              <h3 className="text-lg text-slate-500 font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-silver/30"></span>
                CRO-ES 12345
              </h3>
              
              <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-medium">
                <p>
                  Com dedicação exclusiva à reabilitação oral e implantodontia, o Dr. Artur Cirilo construiu sua carreira focada em resolver casos complexos que devolvem não apenas dentes, mas a dignidade e a alegria de viver de seus pacientes.
                </p>
                <p>
                  Sua filosofia de trabalho une o rigor científico às tecnologias mais modernas do mercado, garantindo procedimentos previsíveis, seguros e com resultados estéticos que impressionam pela naturalidade.
                </p>
                <p className="pl-4 border-l-4 border-cyan-soft italic text-deep-blue font-semibold">
                  "Meu objetivo não é apenas colocar implantes, é entender a história de cada paciente e entregar um sorriso que ele tenha orgulho de mostrar."
                </p>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-2 border-silver/30 flex items-center justify-center text-slate-500 hover:text-cyan-text hover:border-cyan-text transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/dr.arturcirilo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-2 border-silver/30 flex items-center justify-center text-slate-500 hover:text-cyan-text hover:border-cyan-text transition-colors"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="depoimentos" className="py-20 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
          <div className="max-w-3xl relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-cyan-soft rounded-full hidden md:block"></div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-cyan-text font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Depoimentos</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-deep-blue leading-tight">Histórias <br className="hidden md:block" /> Reais</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
                Confira a experiência de quem já transformou o sorriso com o Dr. Artur Cirilo. 
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-cyan-soft/10 border border-cyan-soft/20">
                <div className="flex text-cyan-text">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                </div>
                <span className="text-deep-blue font-bold text-sm">Nota 5.0 no Google</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative flex flex-col gap-6">
          {/* First Row: Right to Left */}
          <div className="flex overflow-hidden select-none group">
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ 
                duration: 50, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-6 whitespace-nowrap py-4 hover:[animation-play-state:paused]"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6">
                  {[
                    { name: "Gabriel Lobão", text: "Fiquei impressionado com o profissionalismo e a atenção aos detalhes. A qualidade do atendimento é excepcional, superando qualquer expectativa que eu tinha sobre um consultório odontológico." },
                    { name: "Vitor de Matos Gomes", text: "Excelente atendimento! Soluções rápidas e muita empatia. O Dr. Artur realmente entrega o melhor para o paciente. E o cantinho do café é um diferencial que torna a espera muito agradável!" },
                    { name: "Lucas Fernandes", text: "Sem dúvida a melhor clínica da região. O Dr. Artur é extremamente atencioso e o resultado do meu tratamento superou todas as expectativas. Recomendo a todos que buscam excelência." },
                    { name: "Lilson Junior", text: "Atendimento de excelência e altamente qualificado. Ambiente extremamente organizado e localização privilegiada. Um padrão de profissionalismo que raramente se vê hoje em dia." },
                    { name: "Erick Henrique Brito", text: "O Dr. Artur foi muito gentil e transparente em todo o processo. Ele é justo nos tratamentos e explica cada etapa com paciência. Recomendo de olhos fechados!" },
                    { name: "Giovani Casali", text: "Excelente profissional, faço tratamento com ele há mais de um ano e a consistência na qualidade é impressionante. É o tipo de dentista que você confia plenamente." },
                    { name: "Yasmin Cirilo", text: "Recepção maravilhosa e ambiente muito aconchegante. O doutor é super paciente e explica tudo de forma clara, fazendo a gente se sentir segura e bem cuidada." }
                  ].map((testimonial, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.02, borderColor: "#22D3EE" }}
                      className="w-[240px] sm:w-[280px] md:w-[320px] p-5 rounded-xl bg-white border border-silver/20 flex flex-col justify-between whitespace-normal shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default"
                    >
                      <div>
                        <div className="flex text-cyan-text mb-3">
                          {[...Array(5)].map((_, starIdx) => <Star key={starIdx} size={14} className="fill-current" />)}
                        </div>
                        <p className="text-slate-600 italic mb-4 leading-relaxed font-medium text-sm">"{testimonial.text}"</p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-silver/5">
                        <div className="w-9 h-9 rounded-full bg-cyan-soft/10 flex items-center justify-center text-cyan-text font-bold text-xs">
                          {testimonial.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-deep-blue text-xs uppercase tracking-wider">{testimonial.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Row: Left to Right */}
          <div className="flex overflow-hidden select-none group">
            <motion.div 
              initial={{ x: "-50%" }}
              animate={{ x: 0 }}
              transition={{ 
                duration: 55, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-6 whitespace-nowrap py-4 hover:[animation-play-state:paused]"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-6">
                  {[
                    { name: "Pedro Henrique Bertuani", text: "Ambiente impecável e localização estratégica. O atendimento de primeira classe faz toda a diferença para quem busca um serviço odontológico diferenciado." },
                    { name: "Fernando Aguimarães", text: "Conheço a reputação do Dr. Artur e sua competência como profissional de elite é totalmente merecida. Ética e excelência definem cada detalhe do seu trabalho." },
                    { name: "Luiz Felipe Rizzi", text: "Simplesmente sensacional! Desde a recepção até a finalização do procedimento, o atendimento foi impecável. Uma experiência odontológica de outro nível." },
                    { name: "Luiz Dondone", text: "O consultório é moderno e muito bem equipado. O dentista foi extremamente didático ao explicar as opções de tratamento, transmitindo muita tranquilidade." },
                    { name: "Julian Lino", text: "A experiência foi tão positiva que as palavras mal conseguem descrever. O cuidado com o paciente e a infraestrutura da clínica são de padrão internacional." },
                    { name: "Pedro Bertuani", text: "Atendimento de altíssimo padrão. Equipe muito bem treinada e o Dr. Artur transmite uma segurança incrível durante todo o processo cirúrgico." },
                    { name: "Neto Penitente", text: "Referência absoluta em Ecoporanga e região. Quem busca o que há de melhor em tecnologia e resultados estéticos precisa conhecer este consultório." }
                  ].map((testimonial, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.02, borderColor: "#22D3EE" }}
                      className="w-[240px] sm:w-[280px] md:w-[320px] p-5 rounded-xl bg-white border border-silver/20 flex flex-col justify-between whitespace-normal shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default"
                    >
                      <div>
                        <div className="flex text-cyan-text mb-3">
                          {[...Array(5)].map((_, starIdx) => <Star key={starIdx} size={14} className="fill-current" />)}
                        </div>
                        <p className="text-slate-600 italic mb-4 leading-relaxed font-medium text-sm">"{testimonial.text}"</p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-silver/5">
                        <div className="w-9 h-9 rounded-full bg-cyan-soft/10 flex items-center justify-center text-cyan-text font-bold text-xs">
                          {testimonial.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-deep-blue text-xs uppercase tracking-wider">{testimonial.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-20 md:py-24 bg-ice relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-soft/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-cyan-soft rounded-full hidden md:block"></div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-cyan-text font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Suporte</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-deep-blue leading-tight">Dúvidas <br className="hidden md:block" /> Frequentes</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Respostas transparentes para as perguntas mais comuns sobre nossos tratamentos.
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "O procedimento de implante dói?",
                a: "Não. Utilizamos protocolos anestésicos rigorosos e técnicas minimamente invasivas para garantir que todo o procedimento seja confortável. O pós-operatório costuma ser muito tranquilo com a medicação correta."
              },
              {
                q: "Quanto tempo demora para colocar os dentes fixos?",
                a: "Depende de cada caso. Porém, com a técnica de Carga Imediata, muitos pacientes entram no consultório e saem com dentes fixos provisórios em poucos dias, sem precisar ficar sem dentes."
              },
              {
                q: "Funciona para quem já perdeu muito osso?",
                a: "Sim! Nossas técnicas avançadas, como implantes angulados ou zigomáticos, permitem a fixação segura mesmo em pacientes com severa perda óssea, muitas vezes dispensando a necessidade de enxertos complexos."
              },
              {
                q: "Qual a durabilidade de uma Prótese Protocolo?",
                a: "Com a higienização correta e as manutenções preventivas na clínica (geralmente a cada 6 meses), os implantes podem durar a vida toda, e a prótese tem uma durabilidade de muitos anos."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <details className="group bg-white rounded-2xl border border-silver/10 hover:border-cyan-soft/30 transition-all duration-300 shadow-sm hover:shadow-md [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer">
                    <div className="flex items-center gap-4 flex-1 pr-8">
                      <span className="flex-shrink-0 text-silver/40 font-mono text-sm tracking-tighter">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold text-base md:text-lg text-deep-blue leading-snug group-hover:text-cyan-text transition-colors">
                        {faq.q}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-cyan-text transition-all duration-300 group-open:rotate-180 group-open:bg-cyan-soft/10 group-open:text-cyan-text">
                      <ChevronDown size={18} />
                    </div>
                  </summary>
                  <div className="px-6 pb-8 md:pl-16 text-slate-500 leading-relaxed font-medium text-sm md:text-base border-t border-slate-50 pt-5">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-24 bg-deep-blue text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-soft/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-soft/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left lg:text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Pronto para transformar sua vida?</h2>
          <p className="text-xl text-silver mb-10 max-w-2xl lg:mx-auto font-medium">
            Dê o primeiro passo para recuperar sua autoestima e a liberdade de sorrir sem medo. Agende sua avaliação premium hoje mesmo.
          </p>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-cyan-soft text-deep-blue hover:bg-white font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
          >
            Falar no WhatsApp <MessageCircle size={24} />
          </a>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-deep-blue text-silver py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-cyan-soft rounded-full overflow-hidden border-2 border-cyan-soft/30 shadow-sm flex-shrink-0">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1ZCBD_e4_Z1DD_h_cEYDyAeqcmTFVEjn0" 
                    alt="Dr. Artur Cirilo" 
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Dr. Artur Cirilo</h3>
                  <p className="text-xs text-cyan-soft font-bold uppercase tracking-wider mt-0.5">Odontologia Avançada</p>
                </div>
              </div>
              <p className="text-silver max-w-sm mb-6 leading-relaxed font-medium">
                Especialista em devolver sorrisos e qualidade de vida através de implantes dentários e estética de alta performance.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-soft hover:text-deep-blue transition-colors text-white">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/dr.arturcirilo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan-soft hover:text-deep-blue transition-colors text-white">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contato</h4>
              <ul className="space-y-4 font-medium">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-cyan-soft shrink-0 mt-1" />
                  <span>Av. Principal, 1000 - Centro<br/>Ecoporanga - ES</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-cyan-soft shrink-0" />
                  <span>(27) 99997-5993</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={20} className="text-cyan-soft shrink-0" />
                  <span>Seg a Sex: 08h às 18h</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Links Rápidos</h4>
              <ul className="space-y-3 font-medium">
                {['Diferencial', 'Serviços', 'Sobre', 'FAQ'].map((item) => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item.toLowerCase())} className="hover:text-cyan-soft transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
            <p>© {new Date().getFullYear()} Dr. Artur Cirilo. Todos os direitos reservados.</p>
            <p>CRO-ES 12345 | Responsável Técnico: Dr. Artur Nunes Cirilo</p>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-cyan-soft text-deep-blue p-4 rounded-full shadow-[0_4px_14px_rgba(34,211,238,0.4)] hover:shadow-[0_6px_20px_rgba(34,211,238,0.6)] hover:scale-110 transition-all duration-300 group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-deep-blue text-sm font-bold py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Agendar Avaliação
        </span>
      </a>
    </div>
  );
}
