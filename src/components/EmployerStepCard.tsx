import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EmployerStepCardProps {
  title: string;
  hint?: string;
  step: string;
  onSubmit?: (value: string, step: string) => void;
}

export const EmployerStepCard: React.FC<EmployerStepCardProps> = ({
  title,
  hint,
  step,
  onSubmit,
}) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    if (input.trim() !== '') {
      setSubmitted(true);
      if (onSubmit) onSubmit(input, step);
    }
  };

  // ⭐ 監聽 step 變化時重設狀態與輸入欄位
  useEffect(() => {
    setInput('');
    setSubmitted(false);
  }, [step]);

  return (
    <Card className="bg-slate-800 text-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {hint && <p className="text-slate-400 mb-2">{hint}</p>}
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入你的觀察或規劃..."
          className="mb-4 bg-slate-700 text-white border-none"
        />
        <Button onClick={handleClick} disabled={submitted}>
          {submitted ? '已送出' : '下一步'}
        </Button>
      </CardContent>
    </Card>
  );
};

