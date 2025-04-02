
import { Minus, Plus } from 'lucide-react';

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const Counter = ({ 
  value, 
  min = 1, 
  max = 99, 
  onChange 
}: CounterProps) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        className="counter-button"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-medium">{value}</span>
      <button 
        className="counter-button" 
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Counter;
