"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Sprout, Shield, Phone, Mail, MapPin, Star, ChevronDown, ChevronUp, HelpCircle, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const formatarTelefone = (valor: string) => {
  const apenasDigitos = valor.replace(/\D/g, "")
  const digitosLimitados = apenasDigitos.slice(0, 11)
  
  if (digitosLimitados.length <= 2) {
    return digitosLimitados.length > 0 ? `(${digitosLimitados}` : ""
  }
  if (digitosLimitados.length <= 6) {
    return `(${digitosLimitados.slice(0, 2)}) ${digitosLimitados.slice(2)}`
  }
  if (digitosLimitados.length <= 10) {
    return `(${digitosLimitados.slice(0, 2)}) ${digitosLimitados.slice(2, 6)}-${digitosLimitados.slice(6)}`
  }
  return `(${digitosLimitados.slice(0, 2)}) ${digitosLimitados.slice(2, 7)}-${digitosLimitados.slice(7)}`
}

export default function AgroLandingPage() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cultura: "",
    area: "",
    unidade: "hectares", // Valor padrão
  })

  const [errors, setErrors] = useState({
    nome: "",
    telefone: "",
    cultura: "",
    area: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedApplication, setExpandedApplication] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let valorFormatado = value

    if (name === "telefone") {
      valorFormatado = formatarTelefone(value)
    }

    setFormData((prev) => ({
      ...prev,
      [name]: valorFormatado,
    }))
    // Limpar o erro do campo alterado
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSolicitarOrcamento = () => {
    const digitosTelefone = formData.telefone.replace(/\D/g, "")
    // Validar os campos do formulário
    const novosErros = {
      nome: !formData.nome.trim() ? "Nome é obrigatório." : "",
      telefone: !formData.telefone.trim() 
        ? "Telefone é obrigatório." 
        : (digitosTelefone.length < 10 
          ? "Telefone incompleto. Digite o DDD + número." 
          : ""),
      cultura: !formData.cultura.trim() ? "Cultura é obrigatória." : "",
      area: !formData.area.trim() ? "Área é obrigatória." : "",
    }

    setErrors(novosErros)

    const temErros = Object.values(novosErros).some((erro) => erro !== "")
    if (temErros) {
      return
    }

    // Criar mensagem para WhatsApp
    const mensagem = `Olá, gostaria de solicitar um orçamento:
Nome: ${formData.nome}
Telefone: ${formData.telefone}
Tipo de Cultura: ${formData.cultura}
Área: ${formData.area} ${formData.unidade}`

    const mensagemCodificada = encodeURIComponent(mensagem)
    const urlWhatsApp = `https://api.whatsapp.com/send/?phone=5579998278540&text=${mensagemCodificada}&type=phone_number&app_absent=0`

    window.open(urlWhatsApp, "_blank")
    setIsSubmitted(true)
  }

  const toggleApplication = (index: number) => {
    setExpandedApplication(expandedApplication === index ? null : index)
  }

  const applications = [
    {
      title: "Cultivo de Milho",
      image: "/corn-field-agriculture.jpg",
      description: "Bioestimulação e aumento da resistência ao acamamento",
      details:
        "A Linha Lithosafra atua como uma condicionadora bioclástica no cultivo do milho. A alta solubilidade do cálcio e magnésio marinho estimula a penetração radicular profunda e melhora a resistência estrutural do colmo, prevenindo o acamamento. Otimiza a absorção de nitrogênio e potássio para maximizar o rendimento de grãos por espiga. Aplicação recomendada: 200-300 kg/ha no plantio.",
    },
    {
      title: "Horticultura",
      image: "/vegetable-garden-organic-farming.jpg",
      description: "Nutrição rizosférica imediata e aumento do shelf-life",
      details:
        "Nas hortaliças, o Lithothamnium age diretamente na rizosfera para neutralizar a acidez imediata do solo. A liberação equilibrada de cálcio, magnésio e mais de 70 micronutrientes melhora a consistência celular das folhas e frutos, aumentando o teor de vitaminas e prolongando a vida útil pós-colheita (shelf-life). Recomendado: 150-300g/m² no preparo de canteiros.",
    },
    {
      title: "Fruticultura",
      image: "/fruit-orchard-citrus-trees.jpg",
      description: "Elevação do brix e prevenção de aborto floral",
      details:
        "Em pomares tropicais, a Linha Lithosafra promove o fornecimento balanceado de minerais complexados pela alga calcária. Melhora o vigor vegetativo, eleva a concentração de açúcares (grau Brix) e reduz drasticamente o abortamento de flores e frutíolos. Excelente para culturas exigentes como citros, caju, coco e manga.",
    },
    {
      title: "Pastagens",
      image: "/green-pasture-cattle-grazing.jpg",
      description: "Recuperação de pastos e maior valor nutricional",
      details:
        "A Linha Lithosafra neutraliza o alumínio tóxico em solos de pastagem e estimula a liberação de fósforo fixado. Isso aceleara o perfilhamento e a velocidade de rebrote do capim após o pastejo, elevando o teor de proteína bruta e minerais na forragem, o que otimiza o ganho de peso do rebanho.",
    },
    {
      title: "Laranja",
      image: "/orange-grove-citrus-plantation.jpg",
      description: "Espessamento da casca e rendimento de suco nos citros",
      details:
        "No cultivo de citros, o magnésio e cálcio bioclásticos ativam o metabolismo enzimático da planta. A Linha Lithosafra fortalece a casca dos frutos, reduzindo a incidência de podridão seca (estresse fisiológico) e aumentando a taxa de sólidos solúveis e rendimento de suco. Recomendado: 150-250 kg/ha na projeção da copa durante a floração.",
    },
    {
      title: "Tomate",
      image: "/tomato.png",
      description: "Prevenção da podridão apical e maior firmeza",
      details:
        "O suprimento constante de cálcio orgânico do Lithothamnium previne a podridão apical ('fundo preto') no tomateiro. Fortalece a parede celular, reduzindo rachaduras causadas por variações hídricas e melhorando a firmeza dos frutos para transporte. Recomendado: 150-200 kg/ha no plantio e 100 kg/ha na pré-floração.",
    },
    {
      title: "Feijão",
      image: "/bean-field-legume-cultivation.jpg",
      description: "Nodulação eficiente e fixação biológica de nitrogênio",
      details:
        "No cultivo de feijão, o Lithothamnium melhora a porosidade e a aeração do solo, estimulando a nodulação radicular e a fixação biológica de nitrogênio (FBN). Fortalece as vagens contra o chochamento de grãos, mesmo sob condições de solos mais ácidos. Aplicação recomendada: 100-150 kg/ha no plantio.",
    },
    {
      title: "Cana-de-açúcar",
      image: "/sugarcane-plantation-agriculture.jpg",
      description: "Aumento do ATR e maior longevidade das soqueiras",
      details:
        "Na cana-de-açúcar, a Linha Lithosafra eleva o teor de sacarose (ATR) ao estimular a fotossíntese por meio do magnésio biodisponível. Garante brotações vigorosas na cana-planta e aumenta a longevidade das soqueiras nas colheitas sucessivas, otimizando a estrutura do solo nas entrelinhas. Ideal para aplicação no sulco de plantio.",
    },
    {
      title: "Mamão",
      image: "/papaya-plantation-tropical-fruit.jpg",
      description: "Prevenção de manchas fisiológicas e raízes mais ativas",
      details:
        "No mamoeiro, o cálcio marinho do Lithothamnium evita o amolecimento precoce dos frutos e reduz manchas fisiológicas na casca. Estimula o crescimento contínuo de radículas absorventes, aumentando a eficiência no aproveitamento de água e de fertilizantes tradicionais (NPK). Recomendado: 100-200 kg/ha no plantio e frutificação.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/bioagro-logo.png" alt="Bioagro Soluções Agropecuárias" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#produtos" className="hover:text-accent transition-colors">
              Produtos
            </a>
            <a href="#aplicacoes" className="hover:text-accent transition-colors">
              Aplicações
            </a>
            <a href="#sobre" className="hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#faq" className="hover:text-accent transition-colors">
              FAQ
            </a>
            <a href="#contato" className="hover:text-accent transition-colors">
              Contato
            </a>
            <a
              href="https://webmail.migadu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Webmail
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-20 px-6"
        style={{
          backgroundImage: "url(/images/hero-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg flex flex-col gap-2">
            <span>Linha Lithosafra</span>
            <span className="text-2xl md:text-4xl font-normal text-white/90">Adubo Premium enriquecido com Lithothamnium</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty drop-shadow-md">
            Potencialize sua produção agrícola com a Linha Lithosafra, nossos fertilizantes premium enriquecidos com alga calcária.
            Soluções sustentáveis da Bioagro para o agronegócio sergipano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90" asChild>
              <a href="#aplicacoes">Ver Aplicações</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              asChild
            >
              <a
                href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+vim+atrav%C3%A9s+do+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es.+Pode+me+ajudar%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com Especialista
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Por que escolher a Linha Lithosafra?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Sprout className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Crescimento Acelerado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rica em cálcio e magnésio, a Linha Lithosafra promove desenvolvimento radicular e foliar superior.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Proteção Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fortalece a resistência das plantas contra pragas e doenças naturalmente com lithothamnium.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>100% Sustentável</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Produto orgânico que melhora a qualidade do solo sem impactos ambientais negativos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="aplicacoes" className="py-16 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Aplicações da Linha Lithosafra</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="space-y-4">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => toggleApplication(index)}
                >
                  <CardHeader className="p-0">
                    <img
                      src={app.image || "/placeholder.svg"}
                      alt={app.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{app.title}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                      </div>
                      {expandedApplication === index ? (
                        <ChevronUp className="h-5 w-5 text-accent" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-accent" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Conteúdo expandido */}
                {expandedApplication === index && (
                  <Card className="border-accent/50 bg-accent/5">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">{app.details}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Linha Lithosafra Premium</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Badge className="w-fit bg-accent">Mais Vendido</Badge>
                <CardTitle>Litho C8420</CardTitle>
                <CardDescription>Crescimento vigoroso e maior resistência</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• NPK 08-04-20 + Lithothamnium</li>
                  <li>• Ideal para todas as culturas</li>
                  <li>• Saco de 50kg</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+Litho+C8420&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit bg-primary">Força no Plantio</Badge>
                <CardTitle>Litho Horto</CardTitle>
                <CardDescription>Ideal para enraizamento e florescimento</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• NPK 03-12-06 + Lithothamnium</li>
                  <li>• O melhor para hortas</li>
                  <li>• Saco de 50kg</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+Litho+Horto&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit bg-primary">Jardim Exuberante</Badge>
                <CardTitle>Litho Garden</CardTitle>
                <CardDescription>Para folhagens e gramados com verde intenso</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• NPK 12-05-05 + Lithothamnium</li>
                  <li>• Ideal para jardins, gramados e ornamentais</li>
                  <li>• Saco de 50kg</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+Litho+Garden&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit bg-primary">Alto Crescimento</Badge>
                <CardTitle>Litho NK305</CardTitle>
                <CardDescription>Máximo desenvolvimento vegetativo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• NPK 30-00-05 + Lithothamnium</li>
                  <li>• Aplicações de cobertura</li>
                  <li>• Saco de 50kg</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+Litho+NK305&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit bg-primary">Mais Versátil</Badge>
                <CardTitle>LTSafra Orgânico</CardTitle>
                <CardDescription>100% natural para agricultura orgânica</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Lithothamnium puro</li>
                  <li>• Certificado orgânico</li>
                  <li>• Saco de 25kg</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+LithoSafra+Org%C3%A2nico&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit bg-primary">Nutrição de Elite</Badge>
                <CardTitle>Lithofort</CardTitle>
                <CardDescription>Aplicação foliar de alta absorção</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Pó micronizado para Dispersão</li>
                  <li>• Rápida Absorção</li>
                  <li>• Saco de 1 KG</li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">A consultar</span>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href="https://api.whatsapp.com/send/?phone=5579998278540&text=Ol%C3%A1%2C+estou+interessado+no+Lithofort&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprar
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">O que dizem nossos clientes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Desde que comecei a usar a Linha Lithosafra, minha produção de milho aumentou. A Bioagro tem produtos de
                  qualidade excepcional!"
                </p>
                <div className="font-semibold">João Silva</div>
                <div className="text-sm text-muted-foreground">Produtor Rural - Itabaiana/SE</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "A Linha Lithosafra é incrível! Minhas plantas ficaram mais resistentes, os frutos ficaram maiores e a
                  colheita foi excepcional. Recomendo a Bioagro."
                </p>
                <div className="font-semibold">Maria Santos</div>
                <div className="text-sm text-muted-foreground">Agricultora - Lagarto/SE</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Atendimento excelente da Bioagro e produtos que realmente fazem a diferença. Parceria de confiança há
                  3 anos."
                </p>
                <div className="font-semibold">Carlos Oliveira</div>
                <div className="text-sm text-muted-foreground">Fazenda São José - Tobias Barreto/SE</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6">Bioagro - Especialistas em Nutrição Vegetal</h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Com mais de 30 anos de experiência no mercado agropecuário sergipano, a Bioagro é pioneira na
                comercialização de fertilizantes enriquecidos com lithothamnium na região, oferecendo soluções
                sustentáveis e eficazes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <span>Produtos registrados no MAPA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-accent" />
                  <span>Compromisso com sustentabilidade</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground mb-4">Produtores atendidos</div>
              <div className="text-4xl font-bold text-primary mb-2">30</div>
              <div className="text-muted-foreground mb-4">Anos de experiência</div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfação dos clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12 flex items-center justify-center gap-2">
            <HelpCircle className="h-8 w-8 text-accent" />
            Perguntas Frequentes
          </h3>
          <Accordion type="single" collapsible className="w-full bg-card p-6 rounded-lg shadow-sm border border-border">
            <AccordionItem value="faq-1" className="border-b border-border py-2">
              <AccordionTrigger className="text-base font-semibold text-primary hover:text-accent hover:no-underline transition-colors">
                O que é o Lithothamnium e como ele beneficia as plantas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm mt-2 leading-relaxed">
                O Lithothamnium é uma alga marinha calcária fossilizada, rica em cálcio, magnésio e mais de 70 micronutrientes orgânicos. Ela corrige a acidez do solo de forma muito mais rápida que o calcário comum, melhora a estrutura física do solo e aumenta a absorção de outros adubos pelas raízes das plantas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border-b border-border py-2">
              <AccordionTrigger className="text-base font-semibold text-primary hover:text-accent hover:no-underline transition-colors">
                Qual a diferença entre a Linha Lithosafra e os adubos comuns do mercado?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Os adubos comuns fornecem apenas os macro nutrientes (NPK) sintéticos. A Linha Lithosafra combina a adubação NPK de alta performance com a biotecnologia do Lithothamnium. Isso garante nutrição imediata e de liberação gradual, além de condicionar o solo a longo prazo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border-b border-border py-2">
              <AccordionTrigger className="text-base font-semibold text-primary hover:text-accent hover:no-underline transition-colors">
                Como é feita a entrega dos adubos em Sergipe?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Realizamos entregas programadas diretamente na sua propriedade em todo o estado de Sergipe. O frete e o prazo de entrega variam de acordo com a quantidade solicitada e a sua região. Entre em contato conosco para fazer uma cotação de frete.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border-b border-border py-2">
              <AccordionTrigger className="text-base font-semibold text-primary hover:text-accent hover:no-underline transition-colors">
                O LTSafra Orgânico possui certificação para uso em lavouras orgânicas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Sim, o LTSafra Orgânico é composto por Lithothamnium puro e atende a todos os requisitos da legislação brasileira para insumos autorizados na agricultura orgânica, sendo amplamente utilizado por produtores certificados no estado.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border-b border-border py-2">
              <AccordionTrigger className="text-base font-semibold text-primary hover:text-accent hover:no-underline transition-colors">
                A Bioagro realiza análise de solo?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Nós orientamos nossos clientes na interpretação das análises de solo para indicar a recomendação exata da Linha Lithosafra para sua cultura. Recomendamos realizar a análise de solo em um laboratório credenciado antes de iniciar a aplicação para obter a máxima eficiência.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-primary mb-12">Entre em Contato</h3>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-6">Fale com nossos especialistas</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>(79) 3241-7850</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <a href="mailto:contato@bioagro.se" className="hover:text-accent transition-colors">
                    contato@bioagro.se
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span>Av. Chanceler Osvaldo Aranha, 746 - José Conrado de Araújo, Aracaju - SE, 49085-100</span>
                    <div className="mt-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2847234567!2d-37.0731234!3d-10.9472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab3f8e9e9e9e9%3A0x1234567890abcdef!2sAv.%20Chanceler%20Osvaldo%20Aranha%2C%20746%20-%20Jos%C3%A9%20Conrado%20de%20Ara%C3%BAjo%2C%20Aracaju%20-%20SE%2C%2049085-100!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-md"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h5 className="font-semibold mb-4">Horário de Funcionamento</h5>
                <p className="text-muted-foreground">Segunda a Sexta: 7h às 17h</p>
                <p className="text-muted-foreground">Sábado: 7h às 12h</p>
              </div>
            </div>
            <Card className="overflow-hidden transition-all duration-300">
              {isSubmitted ? (
                <CardContent className="pt-8 pb-8 flex flex-col items-center text-center space-y-6">
                  <div className="bg-emerald-100 dark:bg-emerald-950/50 p-4 rounded-full animate-bounce">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl text-emerald-600 dark:text-emerald-400 font-bold">
                      Orçamento Solicitado!
                    </CardTitle>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                      Olá, {formData.nome}! Abrimos o WhatsApp para você falar com um especialista. Se o chat não abriu, use o botão abaixo:
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-left text-xs space-y-2 w-full max-w-sm border border-border">
                    <div className="font-semibold text-muted-foreground">Resumo dos dados enviados:</div>
                    <div className="grid grid-cols-2 gap-2 text-foreground">
                      <div><strong>Cultura:</strong> {formData.cultura}</div>
                      <div><strong>Área:</strong> {formData.area} {formData.unidade}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-sm">
                    <Button 
                      className="bg-[#25D366] hover:bg-[#20ba5a] text-white w-full gap-2"
                      onClick={() => {
                        const mensagem = `Olá, gostaria de solicitar um orçamento:\nNome: ${formData.nome}\nTelefone: ${formData.telefone}\nTipo de Cultura: ${formData.cultura}\nÁrea: ${formData.area} ${formData.unidade}`;
                        window.open(`https://api.whatsapp.com/send/?phone=5579998278540&text=${encodeURIComponent(mensagem)}&type=phone_number&app_absent=0`, "_blank");
                      }}
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.63 1.97 14.15 .942 11.52.942c-5.442 0-9.87 4.372-9.874 9.802-.001 1.77.463 3.5 1.34 5.016L1.87 20.4l4.777-1.246zM17.41 14.4c-.316-.16-1.872-.942-2.162-1.047-.29-.105-.502-.158-.713.158-.21.317-.814.158-.998.37-.184.21-.368.105-.684-.055-.316-.16-1.336-.5-2.544-1.597-.94-.855-1.573-1.91-1.757-2.227-.184-.316-.02-.487.138-.645.143-.14.316-.37.474-.553.158-.184.21-.316.316-.527.105-.21.053-.395-.026-.553-.08-.158-.713-1.758-.977-2.4-.257-.63-.518-.544-.713-.553-.184-.009-.395-.01-.605-.01-.21 0-.553.08-.842.4-.29.316-1.106 1.106-1.106 2.7 0 1.593 1.13 3.13 1.29 3.34.158.21 2.226 3.47 5.4 4.807.755.318 1.345.508 1.805.656.76.245 1.45.21 1.996.127.608-.093 1.873-.782 2.137-1.5.263-.717.263-1.33.184-1.46-.08-.13-.29-.21-.606-.37z"/>
                      </svg>
                      Reabrir no WhatsApp
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFormData({
                          nome: "",
                          telefone: "",
                          cultura: "",
                          area: "",
                          unidade: "hectares",
                        })
                        setIsSubmitted(false)
                      }}
                    >
                      Solicitar Outro Orçamento
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSolicitarOrcamento()
                  }}
                >
                  <CardHeader>
                    <CardTitle>Solicite um Orçamento</CardTitle>
                    <CardDescription>Preencha o formulário e receba uma proposta personalizada</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Nome Completo *</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className={`w-full mt-1 px-3 py-2 border rounded-md bg-input text-foreground transition-colors ${
                          errors.nome ? "border-destructive focus-visible:ring-destructive focus:border-destructive" : "border-border"
                        }`}
                        placeholder="Seu nome"
                        required
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, preencha o seu nome completo.")}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                      />
                      {errors.nome && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.nome}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone *</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className={`w-full mt-1 px-3 py-2 border rounded-md bg-input text-foreground transition-colors ${
                          errors.telefone ? "border-destructive focus-visible:ring-destructive focus:border-destructive" : "border-border"
                        }`}
                        placeholder="(79) 99999-9999"
                        required
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, informe seu telefone com DDD.")}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                      />
                      {errors.telefone && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.telefone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tipo de Cultura *</label>
                      <input
                        type="text"
                        name="cultura"
                        value={formData.cultura}
                        onChange={handleInputChange}
                        className={`w-full mt-1 px-3 py-2 border rounded-md bg-input text-foreground transition-colors ${
                          errors.cultura ? "border-destructive focus-visible:ring-destructive focus:border-destructive" : "border-border"
                        }`}
                        placeholder="Ex: Milho, Soja, Hortaliças"
                        required
                        onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, preencha o tipo de cultura.")}
                        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                      />
                      {errors.cultura && (
                        <p className="text-destructive text-xs mt-1 font-medium">{errors.cultura}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium">Área *</label>
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className={`w-full mt-1 px-3 py-2 border rounded-md bg-input text-foreground transition-colors ${
                            errors.area ? "border-destructive focus-visible:ring-destructive focus:border-destructive" : "border-border"
                          }`}
                          placeholder="0"
                          min="0"
                          step="0.1"
                          required
                          onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity("Por favor, insira a área da lavoura.")}
                          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
                        />
                        {errors.area && (
                          <p className="text-destructive text-xs mt-1 font-medium">{errors.area}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Unidade *</label>
                        <select
                          name="unidade"
                          value={formData.unidade}
                          onChange={handleInputChange}
                          className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-input text-foreground"
                          required
                        >
                          <option value="hectares">Hectares</option>
                          <option value="tarefas">Tarefas</option>
                        </select>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 transition-all duration-300">
                      Solicitar Orçamento
                    </Button>
                  </CardContent>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img src="/images/bioagro-logo.png" alt="Bioagro Soluções Agropecuárias" className="h-10 w-auto" />
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Sua parceira no crescimento sustentável da agricultura sergipana.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Produtos</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Litho C8420</li>
                <li>LTSafra Orgânico</li>
                <li>Lithofort</li>
                <li>Condicionadores de Solo</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Empresa</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Sobre Nós</li>
                <li>Certificações</li>
                <li>Sustentabilidade</li>
                <li>Carreiras</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Assistência Técnica</li>
                <li>Análise de Solo</li>
                <li>Treinamentos</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
            <p>&copy; 2024 Bioagro Soluções Agropecuárias. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=5579998278540&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20as%20soluções%20da%20Bioagro.&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.63 1.97 14.15 .942 11.52.942c-5.442 0-9.87 4.372-9.874 9.802-.001 1.77.463 3.5 1.34 5.016L1.87 20.4l4.777-1.246zM17.41 14.4c-.316-.16-1.872-.942-2.162-1.047-.29-.105-.502-.158-.713.158-.21.317-.814.158-.998.37-.184.21-.368.105-.684-.055-.316-.16-1.336-.5-2.544-1.597-.94-.855-1.573-1.91-1.757-2.227-.184-.316-.02-.487.138-.645.143-.14.316-.37.474-.553.158-.184.21-.316.316-.527.105-.21.053-.395-.026-.553-.08-.158-.713-1.758-.977-2.4-.257-.63-.518-.544-.713-.553-.184-.009-.395-.01-.605-.01-.21 0-.553.08-.842.4-.29.316-1.106 1.106-1.106 2.7 0 1.593 1.13 3.13 1.29 3.34.158.21 2.226 3.47 5.4 4.807.755.318 1.345.508 1.805.656.76.245 1.45.21 1.996.127.608-.093 1.873-.782 2.137-1.5.263-.717.263-1.33.184-1.46-.08-.13-.29-.21-.606-.37z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-medium whitespace-nowrap text-sm text-white">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  )
}
