export async function refactorCode(code: string, language: string) {
    const response = await fetch('http://localhost:3000/ai/refactor/open-route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
  
    if (!response.ok) throw new Error('Failed to refactor code');
    return response.json();
  }
  