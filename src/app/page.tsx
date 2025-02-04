"use client";
import { useState, useEffect } from "react";
import { refactorCode, refactorCodeDescription, convertCode, analyzeComplexity } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Code, Repeat, BarChart3 } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [targetLanguage, setTargetLanguage] = useState("python");
  const [operation, setOperation] = useState("refactor");
  const [result, setResult] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [result]);

  const handleProcess = async () => {
    try {
      setLoading(true);
      let data;

      if (operation === "refactor") {
        data = await refactorCode(code, language);
        // const desc = await refactorCodeDescription(code, language);
        // setDescription(desc.refactoredCode);
      } else if (operation === "convert") {
        data = await convertCode(code, language, targetLanguage);
      } else if (operation === "analyze") {
        data = await analyzeComplexity(code, language);
      }

      setResult(data.refactoredCode || data.complexityReport || data.convertedCode || "No response");
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to process code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-900 p-6 flex flex-col gap-4 border-r border-gray-800">
        <motion.h2 className="text-2xl font-bold text-cyan-400 text-center">AI Assistant</motion.h2>

        {/* Operation Selection */}
        <Button
          variant={operation === "refactor" ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-2"
          onClick={() => {
            setResult('');
            setOperation("refactor")
          }}
        >
          <Code size={20} /> Refactor Code
        </Button>

        <Button
          variant={operation === "convert" ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-2"
          onClick={() => {
            setResult('');
            setOperation("convert")
          }}
        >
          <Repeat size={20} /> Convert Code
        </Button>

        <Button
          variant={operation === "analyze" ? "default" : "ghost"}
          className="w-full flex items-center justify-start gap-2"
          onClick={() => {
            setResult('');
            setOperation("analyze")
          }}
        >
          <BarChart3 size={20} /> Analyze Complexity
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        <motion.h1 className="text-5xl font-extrabold text-cyan-400">AI Code Assistant</motion.h1>

        <Card className="bg-gray-900/80 rounded-xl border border-gray-800 w-full max-w-4xl">
          <CardContent className="p-6 space-y-6">
            <Textarea
              className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-700"
              rows={6}
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Select onValueChange={setLanguage} defaultValue={language}>
            <SelectTrigger className="w-48 bg-gray-800 text-white px-4 py-2 rounded-lg">
              <SelectValue placeholder="Target Language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
            </SelectContent>
          </Select>
        </div>


        {/* Language Selection (Only for convert mode) */}
        {operation === "convert" && (
          <div className="flex gap-4">
            <Select onValueChange={setTargetLanguage} defaultValue={targetLanguage}>
              <SelectTrigger className="w-48 bg-gray-800 text-white px-4 py-2 rounded-lg">
                <SelectValue placeholder="Target Language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button
          className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-lg font-semibold rounded-lg flex items-center justify-center"
          onClick={handleProcess}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Process Code"}
        </Button>

        {description && operation === "refactor" && (
          <motion.div className="text-gray-300 bg-gray-800 p-4 rounded-xl w-full max-w-3xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
          </motion.div>
        )}

        {result && (
          <motion.div className="w-full max-w-4xl">
            <Card className="bg-gray-900/80 rounded-xl border border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-cyan-400">
                  {operation === "refactor" ? "Refactored Code" : operation === "convert" ? "Converted Code" : "Complexity Analysis"}
                </h2>
                <pre className="bg-gray-950 p-4 rounded-lg text-sm">
                  <code className={`language-${language}`}>{result}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
