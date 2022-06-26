import { useCallback, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FoodData } from "../../pages/Dashboard";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Form } from "./styles";

interface ModalAddFoodProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  handleAddFood: (food: FoodData) => Promise<void>;
}

export const ModalAddFood: React.FC<ModalAddFoodProps> = ({
  isOpen,
  toggleIsOpen,
  handleAddFood,
}) => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    (data: FoodData) => {
      handleAddFood(data);
      toggleIsOpen();
    },
    [handleAddFood, toggleIsOpen],
  );

  return (
    <Modal isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
