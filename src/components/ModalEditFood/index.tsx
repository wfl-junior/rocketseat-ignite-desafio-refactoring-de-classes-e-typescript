import { useCallback, useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FoodData } from "../../pages/Dashboard";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Form } from "./styles";

interface ModalEditFoodProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  editingFood: FoodData;
  handleUpdateFood: (food: FoodData) => Promise<void>;
}

export const ModalEditFood: React.FC<ModalEditFoodProps> = ({
  isOpen,
  toggleIsOpen,
  editingFood,
  handleUpdateFood,
}) => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(
    (data: FoodData) => {
      handleUpdateFood(data);
      toggleIsOpen();
    },
    [handleUpdateFood, toggleIsOpen],
  );

  return (
    <Modal isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
