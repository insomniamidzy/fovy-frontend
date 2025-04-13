import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MarketExplorerCardProps {
  title: string;
  hint?: string;
  tags?: string[];
  step: string;
  onSubmit?: (value: string, step: string) => void;
}

export const MarketExplorerCard: React.FC<MarketExplorerCardProps> = ({
    title,
    hint,
    tags = [],
    step,
    onSubmit,
  }) => {
    const [input, setInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = () => {
      if (input.trim() !== '' && onSubmit) {
        onSubmit(input, step);
        setSubmitted(true); // ✅ 加上這一行
      }
    };
  
    useEffect(() => {
      setInput('');
      setSubmitted(false); // ✅ 當 step 改變，重設狀態
    }, [step]);
  
    return (
      <Card className="mb-6 bg-slate-800 text-white p-4 shadow-md border border-gray-600">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          {hint && <p className="text-sm text-slate-400 mb-4">{hint}</p>}
  
          <Input
            type="text"
            placeholder="輸入你的想法..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4 bg-slate-700 text-white placeholder-slate-400"
          />
  
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => setInput(tag)}
                  className="cursor-pointer rounded-full bg-blue-900 px-3 py-1 text-sm text-blue-200 hover:bg-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
  
          <Button
            onClick={handleSubmit}
            disabled={submitted}
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {submitted ? '已送出' : '送出'}
          </Button>
        </CardContent>
      </Card>
    );
  };
  

  