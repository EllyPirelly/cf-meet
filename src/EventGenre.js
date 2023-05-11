import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const colors = ['#c9ada7', '#7b3f00', '#9a8c98', '#663399', '#304366'];

const getData = (events) => {
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

  const data = genres.map((genre) => {
    const value = events.filter(({ summary }) =>
      summary.split(' ').includes(genre)
    ).length;

    return {
      name: genre,
      value
    };
  });

  return data;
};

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData(events));
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Legend verticalAlign='top' iconType='triangle' iconSize={16} height={36} />
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={80}
          fill='#304366'
          dataKey='value'
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;