"use client";
import { useState } from "react";
import { refactorCode } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Code Refactoring App</h1>

      <Card className="w-full max-w-2xl p-4 bg-gray-800">
        <CardContent>
          <Textarea
            className="w-full bg-gray-700 text-white p-3 rounded-md"
            rows={6}
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="flex justify-between items-center mt-3">
            <Select onValueChange={setLanguage} defaultValue={language}>
              <SelectTrigger className="bg-gray-700 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-blue-600 hover:bg-blue-700 px-6"
              onClick={handleRefactor}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Refactor Code"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="w-full max-w-2xl p-4 bg-gray-800 mt-4">
          <CardContent>
            <pre className="language-javascript bg-gray-900 p-4 rounded-md overflow-auto">
              <code className={`language-${language}`}>{result}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
