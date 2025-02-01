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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-8 space-y-6">
      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center tracking-wide text-cyan-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI Code Refactor
      </motion.h1>

      {/* Input Section */}
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gray-900/80 shadow-2xl backdrop-blur-lg rounded-xl border border-gray-800">
          <CardContent className="p-6 space-y-6">
            {/* Code Input */}
            <Textarea
              className="w-full bg-gray-800/80 text-white p-4 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
              rows={6}
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            {/* Language Selector & Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-800/80 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 transition-all">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white rounded-md">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 text-lg font-semibold rounded-lg flex items-center justify-center transition-all duration-300 shadow-md"
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

      {/* Description Output */}
      {description && (
        <motion.div
          className="text-gray-300 text-sm bg-gray-800/90 p-4 rounded-xl shadow-md w-full max-w-3xl border border-gray-700 backdrop-blur-lg prose prose-invert"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
        </motion.div>
      )}

      {/* Refactored Code Output */}
      {result && (
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900/80 shadow-xl rounded-xl border border-gray-800 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Refactored Code
              </h2>
              <pre className="language-javascript bg-gray-950/90 p-4 rounded-lg overflow-auto border border-gray-800 text-sm sm:text-base">
                <code className={`language-${language}`}>{result}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
