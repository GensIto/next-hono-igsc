"use client";

import { Database } from "@/schema";
import { useEffect, useState } from "react";
import { animated, useSprings } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export const MemberCard = ({
  usersData,
}: {
  usersData: Database["public"]["Tables"]["users"]["Row"][];
}) => {
  const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });
  const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(usersData.length, (i) => ({
    to: to(i),
    from: from(),
  }));

  useEffect(() => {
    api.start((i) => to(i));
  }, [api]);

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === usersData.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );

  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => {
        const user = usersData[i];
        return (
          // eslint-disable-next-line
          // @ts-ignore
          <animated.div
            className='absolute top-1/2 left-1/2'
            key={user.id}
            style={{ x, y }}
          >
            {/* eslint-disable-next-line */}
            {/* @ts-ignore */}
            <animated.div
              style={{
                transform: rot.to((r) => `rotate(${r}deg)`),
                scale: scale.to((s) => s),
              }}
              {...bind(i)}
            >
              <Card className=' min-w-full w-96 p-6 flex items-center gap-4 justify-between flex-col'>
                <Avatar className='bg-indigo-500 size-24' />
                <div className='w-full'>
                  <p>name: {user.name}</p>
                  <p>department: {user.department}</p>
                </div>
              </Card>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
};
