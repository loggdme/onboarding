import { MinusIcon, PlusIcon } from 'lucide-react';

import { Badge } from '$/components/ui/badge';
import { Button } from '$/components/ui/button';
import { useCount, useCounterActions } from '$/pages/HomePage/stores/counter';

export const ZustandDemo = () => {
  const { increment, decrement } = useCounterActions();
  const count = useCount();

  return (
    <div className="flex items-center gap-2">
      <Button className="size-8" onClick={increment} size="icon" variant="secondary">
        <MinusIcon />
      </Button>
      <Badge className="h-5 min-w-8 rounded-full px-1">{count}</Badge>
      <Button className="size-8" onClick={decrement} size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </div>
  );
};
