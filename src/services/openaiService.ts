import { toast } from "@/hooks/use-toast";
import WhatsAppQRCodeWrapper from "@/components/WhatsAppQRCodeWrapper";

interface OpenAIStatus {
  isConnected: boolean;
  apiKey: string | null;
}

class OpenAIService {
  private apiKey: string | null = null;
  private isConnected: boolean = false;
  
  // Validate OpenAI API key by making a simple request
  public async validateApiKey(key: string): Promise<boolean> {
    // In a real app, you'd make a simple request to OpenAI API
    // For demo purposes, we'll simulate validation with a timeout
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));
      
      // For demo, we'll just validate that it starts with "sk-"
      const isValid = key.startsWith('sk-');
      
      if (isValid) {
        this.apiKey = key;
        this.isConnected = true;
        
        // Save to localStorage for persistence
        localStorage.setItem('openai_api_key', key);
        
        toast({
          title: "API OpenAI conectada",
          description: "Sua chave da OpenAI foi validada com sucesso.",
          className: "bg-green-900/80 border-green-400 text-green-50 relative overflow-hidden"
        });
      } else {
        toast({
          title: "Chave da API inválida",
          description: "Por favor, verifique sua chave da OpenAI e tente novamente.",
          variant: "destructive"
        });
      }
      
      return isValid;
    } catch (error) {
      console.error('Error validating OpenAI API key:', error);
      this.isConnected = false;
      
      toast({
        title: "Erro na API",
        description: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        variant: "destructive"
      });
      
      return false;
    }
  }
  
  public getStatus(): OpenAIStatus {
    return {
      isConnected: this.isConnected,
      apiKey: this.apiKey,
    };
  }
  
  public getApiKey(): string | null {
    return this.apiKey;
  }
  
  public initialize() {
    // Load API key from localStorage if available
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      this.apiKey = savedKey;
      this.isConnected = true;
    }
  }
  
  public disconnect() {
    this.apiKey = null;
    this.isConnected = false;
    localStorage.removeItem('openai_api_key');
  }
}

// Singleton instance
const openaiService = new OpenAIService();
export default openaiService;
