import React, { useEffect, useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs font-semibold tracking-tight text-white select-none">
      <span className="font-semibold text-[13px] tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5 text-white/90">
        {/* Cellular signal bars */}
        <div className="flex items-end gap-[1.5px] h-2.5">
          <div className="w-[3px] h-1 bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-1.5 bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-2 bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-2.5 bg-white rounded-[0.5px]"></div>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4 fill-white" />
      </div>
    </div>
  );
};
