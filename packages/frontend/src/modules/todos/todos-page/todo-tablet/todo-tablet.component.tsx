import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import OneTodo from '../one-todo/one-todo.component';
import { ITodosRenderProps } from '../../types/todos.types';
import { SliderContainer } from '../todos-page.styled';
import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperData {
  activeIndex: number;
  slides: any[];
}

const TodosTabletComponent = (todosProps: ITodosRenderProps) => {
  const {
    todos,
    onDeleteTodo,
    onCompleteTodo,
    userId,
    currentPage,
    setCurrentPage,
    maxPage,
    currentFilter,
    debounceSearch
  } = todosProps;
  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [currentFilter, debounceSearch]);

  useEffect(() => {
    if (currentPage === 1) {
      setItems(todos);
    } else {
      const newItems = todos.filter((todo) => !items.some((item) => item.id === todo.id));
      setItems((prevItems) => [...prevItems, ...newItems]);
    }
  }, [todos]);

  const handleSlideChange = (el: SwiperData) => {
    if (el.activeIndex === el.slides.length - 1 && currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SliderContainer>
      <Swiper
        effect="coverflow"
        spaceBetween={50}
        slidesPerView="auto"
        slidesPerGroup={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        onUpdate={(swiper) => {
          if (swiper.activeIndex !== 0 && currentPage === 1) {
            swiper.slideTo(0);
          }
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        onSlideChange={handleSlideChange}
        style={{
          left: 0
        }}
      >
        {items?.map((todo, index) => (
          <SwiperSlide style={{ height: '320px' }} key={todo.id}>
            <OneTodo
              userId={userId}
              key={todo.id}
              index={index}
              todo={todo}
              onDelete={() => onDeleteTodo(todo.id)}
              onComplete={onCompleteTodo(todo)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderContainer>
  );
};

export default TodosTabletComponent;
