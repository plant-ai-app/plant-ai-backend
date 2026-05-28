import { SchemaType } from "@google/generative-ai";

export const plantSchema = {
  type: SchemaType.OBJECT,
  properties: {
    scientific_name: { 
      type: SchemaType.STRING,
      description: "Nome científico oficial da planta (ex: Sansevieria trifasciata)."
    },
    family: { 
      type: SchemaType.STRING,
      description: "Família botânica à qual a planta pertence (ex: Asparagaceae)."
    },
    type: { 
      type: SchemaType.STRING,
      description: "Tipo ou categoria biológica da planta em português e letra minúscula. Exemplos: 'tropical', 'suculenta', 'cacto', 'samambaia', 'herbácea'."
    },
    origin: { 
      type: SchemaType.STRING,
      description: "País, continente ou região de origem nativa da planta em português (ex: 'África Ocidental')."
    },
    difficulty: { 
      type: SchemaType.OBJECT, 
      properties: {
        level: {
          type: SchemaType.STRING, 
          enum: ["easy", "medium", "hard"],
          description: "Nível técnico de dificuldade de cultivo e manutenção da planta."
        },
        description: {
          type: SchemaType.STRING,
          description: "Uma única frase curtíssima em português (sem quebras de linha '\\n') explicando o motivo dessa classificação de dificuldade. Deve conter obrigatoriamente entre 10 e 15 palavras."
        }
      },
      required: ["level", "description"]
    },
    growth: {
      type: SchemaType.OBJECT,
      properties: {
        speed: { 
          type: SchemaType.STRING, 
          enum: ["slow", "moderate", "fast"],
          description: "Velocidade de crescimento da planta."
        },
        description: { 
          type: SchemaType.STRING, 
          description: "Um único parágrafo curto em português (sem quebras de linha '\\n') detalhando o ritmo de crescimento e o que esperar do desenvolvimento da planta. Deve ter entre 20 e 35 palavras." 
        }
      },
      required: ["speed", "description"]
    },
    toxicity: {
      type: SchemaType.OBJECT,
      properties: {
        is_toxic: { 
          type: SchemaType.BOOLEAN,
          description: "Indica se a planta é tóxica para animais de estimação (cães e gatos) ou humanos se ingerida."
        },
        description: { 
          type: SchemaType.STRING, 
          description: "Um único parágrafo curto em português (sem quebras de linha '\\n') detalhando os efeitos da toxicidade ou confirmando a segurança da planta. Deve ter entre 20 e 35 palavras." 
        }
      },
      required: ["is_toxic", "description"]
    },
    ideal_locations: {
      type: SchemaType.ARRAY,
      description: "MUITO IMPORTANTE: Retorne EXATAMENTE 3 objetos representando os melhores locais da casa para essa planta.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { 
            type: SchemaType.STRING,
            description: "O nome do cômodo ou ambiente em português do Brasil (ex: 'Sala de Estar', 'Varanda', 'Escritório')."
          },
          description: { 
            type: SchemaType.STRING, 
            description: "Explicação em português de o porquê este local é ideal (focado em luz ou espaço). Deve conter uma única frase curta (sem quebras de linha '\\n') de 15 a 20 palavras." 
          }
        },
        required: ["name", "description"]
      }
    },
    care: {
      type: SchemaType.OBJECT,
      properties: {
        water: {
          type: SchemaType.OBJECT,
          properties: {
            frequency: { 
              type: SchemaType.STRING,
              description: "Funciona como o título curto em português (ex: '1x por semana', 'A cada 10 dias')."
            },
            description: { 
              type: SchemaType.STRING, 
              description: "Uma única frase curta em português (sem quebras de linha '\\n') detalhando a rega. Deve ter obrigatoriamente entre 10 e 15 palavras." 
            }
          },
          required: ["frequency", "description"]
        },
        light: {
          type: SchemaType.OBJECT,
          properties: {
            type: { 
              type: SchemaType.STRING,
              description: "Funciona como o título curto em português (ex: 'Luz indireta', 'Sol pleno')."
            },
            description: { 
              type: SchemaType.STRING, 
              description: "Uma única frase curta em português (sem quebras de linha '\\n') detalhando a luminosidade. Deve ter obrigatoriamente entre 10 e 15 palavras." 
            }
          },
          required: ["type", "description"]
        },
        climate: {
          type: SchemaType.OBJECT,
          properties: {
            humidity: { type: SchemaType.STRING, description: "Nível de umidade (ex: 'Alta', 'Média')." },
            temperature: { type: SchemaType.STRING, description: "Faixa de temperatura (ex: '18–28°C')." },
            description: { 
              type: SchemaType.STRING, 
              description: "Uma única frase curta em português (sem quebras de linha '\\n') sobre o ambiente climático ideal. Deve ter obrigatoriamente entre 10 e 15 palavras." 
            }
          },
          required: ["humidity", "temperature", "description"]
        },
        maintenance: {
          type: SchemaType.OBJECT,
          properties: {
            fertilizing: {
              type: SchemaType.OBJECT,
              properties: { 
                frequency: { type: SchemaType.STRING, description: "Título curto de frequência (ex: 'Mensal na primavera')." },
                description: { 
                  type: SchemaType.STRING, 
                  description: "Uma única frase curta em português (sem quebras de linha '\\n') sobre adubação. Deve ter obrigatoriamente entre 10 e 15 palavras." 
                }
              },
              required: ["frequency", "description"]
            },
            pruning: {
              type: SchemaType.OBJECT,
              properties: { 
                title: { type: SchemaType.STRING, description: "Título curto da ação (ex: 'Poda de limpeza', 'Remoção de folhas secas')." },
                description: { 
                  type: SchemaType.STRING, 
                  description: "Uma única frase curta em português (sem quebras de linha '\\n') detalhando como e quando podar. Deve ter obrigatoriamente entre 10 e 15 palavras." 
                }
              },
              required: ["title", "description"]
            },
            repotting: {
              type: SchemaType.OBJECT,
              properties: { 
                frequency: { type: SchemaType.STRING, description: "Título curto de frequência (ex: 'A cada 2 anos')." },
                description: { 
                  type: SchemaType.STRING, 
                  description: "Uma única frase curta em português (sem quebras de linha '\\n') explicando o replantio. Deve ter obrigatoriamente entre 10 e 15 palavras." 
                }
              },
              required: ["frequency", "description"]
            }
          },
          required: ["fertilizing", "pruning", "repotting"]
        }
      },
      required: ["water", "light", "climate", "maintenance"]
    },
    alerts: {
      type: SchemaType.OBJECT,
      properties: {
        common_problems: {
          type: SchemaType.ARRAY,
          description: "MUITO IMPORTANTE: Retorne EXATAMENTE 3 objetos representando os problemas mais comuns que a planta pode apresentar.",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: { 
                type: SchemaType.STRING,
                description: "Título curto do problema em português (ex: 'Folhas amareladas', 'Podridão das raízes', 'Cochonilhas')."
              },
              description: { 
                type: SchemaType.STRING, 
                description: "Uma única frase curta em português (sem quebras de linha '\\n') explicando a causa ou a solução do problema. Deve ter obrigatoriamente entre 15 e 20 palavras." 
              }
            },
            required: ["title", "description"]
          }
        }
      },
      required: ["common_problems"]
    },
    curiosities: {
      type: SchemaType.OBJECT,
      properties: {
        origin: {
          type: SchemaType.STRING,
          description: "Um único parágrafo fluido e contínuo em português (sem quebras de linha '\\n') detalhando a origem histórica, geográfica e nativa da planta. O texto deve ter entre 35 e 50 palavras no total. Evite começar o texto com frases óbvias como 'A origem desta planta...'"
        },
        fun_fact: {
          type: SchemaType.STRING,
          description: "Um único parágrafo fluido e contínuo em português (sem quebras de linha '\\n') trazendo um fato científico curioso, uma adaptação biológica bizarra ou uma característica única sobre a planta. O texto deve ter entre 35 e 50 palavras no total."
        },
        symbolism: {
          type: SchemaType.STRING,
          description: "Um único parágrafo fluido e contínuo em português (sem quebras de linha '\\n') explicando o simbolismo cultural, misticismo, crenças populares, Feng Shui ou significados associados à planta. O texto deve ter entre 35 e 50 palavras no total."
        },
        decorative_use: {
          type: SchemaType.STRING,
          description: "Um único parágrafo fluido e contínuo em português (sem quebras de linha '\\n') abordando o uso no design de interiores, paisagismo, melhores combinações estéticas e como ela valoriza o ambiente. O texto deve ter entre 35 e 50 palavras no total."
        }
      },
      required: ["origin", "fun_fact", "symbolism", "decorative_use"]
    }
  },
  required: [
    "scientific_name", 
    "family", 
    "type", 
    "origin", 
    "difficulty", 
    "growth", 
    "toxicity", 
    "ideal_locations", 
    "care", 
    "alerts", 
    "curiosities"
  ]
};