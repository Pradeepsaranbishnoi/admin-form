const XANO_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:MDLKCaYO';

export const api = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${XANO_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  submitForm: async (formData: FormData, token: string) => {
    try {
      const response = await fetch(`${XANO_BASE_URL}/form_data`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};