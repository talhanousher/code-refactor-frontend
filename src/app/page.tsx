"use client";
import { useState, useEffect } from "react";
import { refactorCode } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [result]);

  const handleRefactor = async () => {
    try {
      setLoading(true);
      const data = await refactorCode(code, language);
      setResult(data.refactoredCode);
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to refactor code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 space-y-8">
      <h1 className="text-4xl font-extrabold text-center tracking-wide">Code Refactoring Tool</h1>
      
      <Card className="w-full max-w-3xl p-6 bg-gray-800 shadow-lg rounded-lg">
        <CardContent>
          <Textarea
            className="w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={8}
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-4 sm:space-y-0">
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white rounded-md">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-300"
              onClick={handleRefactor}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Refactor Code"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="w-full max-w-3xl p-6 bg-gray-800 shadow-lg rounded-lg mt-6 overflow-auto">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Refactored Code</h2>
            <pre className="language-javascript bg-gray-900 p-4 rounded-lg overflow-auto border border-gray-700 text-sm sm:text-base">
              <code className={`language-${language}`}>{result}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
