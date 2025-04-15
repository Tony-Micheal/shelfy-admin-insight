
import { useState } from 'react';
import { CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type FilterOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};

const FilterSelect = ({ label, options, value, onChange }: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button 
          className="w-full p-2 flex items-center justify-between border rounded-md bg-white text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{options.find(opt => opt.value === value)?.label || "Select option"}</span>
          <ChevronDown size={16} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-md mt-1 z-10 shadow-md">
            {options.map(option => (
              <div 
                key={option.value} 
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type FiltersProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Filters({ isOpen, onClose }: FiltersProps) {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date());
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [region, setRegion] = useState("all");
  const [channel, setChannel] = useState("all");
  const [category, setCategory] = useState("all");
  
  const regions: FilterOption[] = [
    { value: "all", label: "All Regions" },
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
  ];
  
  const channels: FilterOption[] = [
    { value: "all", label: "All Channels" },
    { value: "grocery", label: "Grocery" },
    { value: "convenience", label: "Convenience" },
    { value: "supermarket", label: "Supermarket" },
    { value: "hypermarket", label: "Hypermarket" },
  ];
  
  const categories: FilterOption[] = [
    { value: "all", label: "All Categories" },
    { value: "dairy", label: "Dairy" },
    { value: "beverages", label: "Beverages" },
    { value: "bakery", label: "Bakery" },
    { value: "snacks", label: "Snacks" },
    { value: "produce", label: "Produce" },
  ];
  
  const filterClasses = isOpen 
    ? "translate-x-0 opacity-100" 
    : "translate-x-full opacity-0 pointer-events-none";

  return (
    <>
      {/* Filter drawer that slides in from the side */}
      <div 
        className={`fixed right-0 top-0 z-30 h-screen w-[280px] bg-white border-l border-gray-200 p-5 overflow-y-auto transition-all duration-300 ease-in-out ${filterClasses}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={18} />
          </Button>
        </div>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">From</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <FilterSelect 
            label="Region" 
            options={regions} 
            value={region} 
            onChange={setRegion} 
          />
          
          <FilterSelect 
            label="Channel" 
            options={channels} 
            value={channel} 
            onChange={setChannel} 
          />
          
          <FilterSelect 
            label="Category" 
            options={categories} 
            value={category} 
            onChange={setCategory} 
          />
          
          <div className="pt-4">
            <Button className="w-full bg-shelfy-teal hover:bg-shelfy-teal/90">
              Apply Filters
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => {
                setFromDate(new Date());
                setToDate(new Date());
                setRegion("all");
                setChannel("all");
                setCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay when filter is open on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
