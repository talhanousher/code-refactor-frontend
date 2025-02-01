export async function refactorCode(code: string, language: string) {
    const response = await fetch('https://code-refactor-backend-production.up.railway.app/ai/refactor/open-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
  
    if (!response.ok) throw new Error('Failed to refactor code');
    return response.json();
  }
  
  export async function refactorCodeDescription(code: string, language: string) {
    const response = await fetch('https://code-refactor-backend-production.up.railway.app/ai/refactor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
  
    if (!response.ok) throw new Error('Failed to refactor code');
    return response.json();
  }
  