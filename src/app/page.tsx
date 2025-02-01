"use client";
import { useState, useEffect } from "react";
import { refactorCode, refactorCodeDescription } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Code } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [result]);

  const handleRefactor = async () => {
    try {
      setLoading(true);
      const data = await refactorCode(code, language);
      const description = await refactorCodeDescription(code, language);
      setResult(data.refactoredCode);
      setDescription(description.refactoredCode);
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to refactor code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6 space-y-8">
      <motion.h1
        className="text-5xl font-extrabold text-center tracking-wide text-blue-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Code Refactoring Tool
      </motion.h1>

      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gray-900 shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <Textarea
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              rows={8}
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-4 sm:space-y-0">
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-full sm:w-auto bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white rounded-md">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 py-2 text-lg font-semibold rounded-lg flex items-center justify-center transition-all duration-300 shadow-md"
                onClick={handleRefactor}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    <Code className="mr-2 w-5 h-5" />
                    Refactor Code
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {description && (
        <motion.p
          className="text-gray-400 text-sm text-center bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-2xl border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {<ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>}
        </motion.p>
      )}

      {result && (
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-900 shadow-xl rounded-2xl mt-6 overflow-auto">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">
                Refactored Code
              </h2>
              <pre className="language-javascript bg-gray-950 p-4 rounded-lg overflow-auto border border-gray-800 text-sm sm:text-base">
                <code className={`language-${language}`}>{result}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
