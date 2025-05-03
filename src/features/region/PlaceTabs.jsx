// src/features/region/PlaceTabs.jsx
import React, { useMemo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PlaceItem from './PlaceItem';

export default function PlaceTabs({ places, onPlaceClick }) {
  const grouped = useMemo(() => {
    return ['DAY1','DAY2','DAY3'].reduce((acc, day) => {
      acc[day] = places.filter(p => p.whichDay === day);
      return acc;
    }, {});
  }, [places]);

  return (
    <Tabs defaultActiveKey="DAY1" className="mb-3">
      {Object.entries(grouped).map(([day, list]) => (
        <Tab eventKey={day} title={day} key={day}>
          {list.length > 0 ? (
            list.map(p => (
              <PlaceItem key={p.id} place={p} onClick={onPlaceClick} />
            ))
          ) : (
            <p>{day} 정보가 없습니다.</p>
          )}
        </Tab>
      ))}
    </Tabs>
  );
}
