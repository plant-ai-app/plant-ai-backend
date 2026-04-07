import 'dotenv/config';

if (!process.env.PLANTNET_API_KEY) {
  console.warn("AVISO: PLANTNET_API_KEY não encontrada no arquivo .env");
}

const plantNetApiKey = process.env.PLANTNET_API_KEY || '';
const plantNetApiUrl = "https://my-api.plantnet.org/v2/identify/all";

export const identifyPlant = async (imageBuffer, mimeType = 'image/jpeg', language = 'pt') => {
  if (!plantNetApiKey) {
    throw new Error("API Key do Pl@ntNet não configurada");
  }

  try {
    const formData = new FormData();
    // A API do Pl@ntNet requer o campo 'organs' além do arquivo de imagem
    formData.append('images', new Blob([imageBuffer], { type: mimeType }), 'image.jpg');
    formData.append('organs', 'auto');

    const url = new URL(plantNetApiUrl);
    url.searchParams.append('api-key', plantNetApiKey);
    url.searchParams.append('lang', language);
    url.searchParams.append('include-related-images', 'true');
    url.searchParams.append('no-reject', 'false');
    url.searchParams.append('nb-results', '6');

    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // A API do Pl@ntNet retorna 404 quando não acha nenhuma correspondência na foto
      if (response.status === 404 || (errorData && errorData.message === 'Plant not found')) {
        throw new Error("Não foi possível identificar nenhuma planta nesta imagem. Tente enviar uma foto mais nítida.");
      }

      throw new Error(`Erro na API do Pl@ntNet: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Erro ao identificar planta via Pl@ntNet:", error);
    throw error;
  }
};
