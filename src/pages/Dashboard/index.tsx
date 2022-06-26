import { Fragment, useCallback, useEffect, useState } from "react";
import { Food } from "../../components/Food";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { api } from "../../services/api";
import { FoodsContainer } from "./styles";

export interface FoodData {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [editingFood, setEditingFood] = useState<FoodData>({} as FoodData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get<FoodData[]>("/foods").then(response => {
      setFoods(response.data);
    });
  }, []);

  const handleAddFood = useCallback(async (food: FoodData) => {
    try {
      const { data } = await api.post<FoodData>("/foods", {
        ...food,
        available: true,
      });

      setFoods(foods => [...foods, data]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateFood = useCallback(
    async (foodToUpdate: FoodData) => {
      try {
        const { data: foodUpdated } = await api.put<FoodData>(
          `/foods/${editingFood.id}`,
          {
            ...editingFood,
            ...foodToUpdate,
          },
        );

        setFoods(foods => {
          return foods.map(food => {
            if (food.id === editingFood.id) {
              return {
                ...foodToUpdate,
                ...foodUpdated,
              };
            }

            return food;
          });
        });
      } catch (err) {
        console.log(err);
      }
    },
    [editingFood],
  );

  const handleDeleteFood = useCallback(async (id: FoodData["id"]) => {
    await api.delete(`/foods/${id}`);
    setFoods(foods => foods.filter(food => food.id !== id));
  }, []);

  const toggleModal = useCallback(() => {
    setModalOpen(open => !open);
  }, []);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(open => !open);
  }, []);

  const handleEditFood = useCallback((food: FoodData) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }, []);

  return (
    <Fragment>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        toggleIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        toggleIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </Fragment>
  );
};
