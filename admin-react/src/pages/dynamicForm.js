import React, { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';

function DynamicForm() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [items, setItems] = useState([
    { id: Date.now(), name: '', urllink: '', indxno: '', children: [] },
  ]);

  const updateItem = (path, key, value) => {
    setItems((prev) => updateNestedItem(prev, path, key, value));
  };

  const updateNestedItem = (list, path, key, value) => {
    const [currentId, ...restPath] = path;
    return list.map((item) => {
      if (item.id === currentId) {
        if (restPath.length === 0) {
          return { ...item, [key]: value };
        } else {
          return {
            ...item,
            children: updateNestedItem(item.children, restPath, key, value),
          };
        }
      }
      return item;
    });
  };

  const deleteItem = (path) => {
    setItems((prev) => deleteNestedItem(prev, path));
  };

  const deleteNestedItem = (list, path) => {
    const [currentId, ...restPath] = path;
    if (restPath.length === 0) {
      return list.filter((item) => item.id !== currentId);
    }
    return list.map((item) => {
      if (item.id === currentId) {
        return {
          ...item,
          children: deleteNestedItem(item.children, restPath),
        };
      }
      return item;
    });
  };

  const addChild = (path) => {
    setItems((prev) => addNestedChild(prev, path));
  };

  const addNestedChild = (list, path) => {
    const [currentId, ...restPath] = path;
    if (restPath.length === 0) {
      return list.map((item) =>
        item.id === currentId
          ? {
              ...item,
              children: [
                ...item.children,
                { id: Date.now() + Math.random(), name: '', urllink: '', indxno: '', children: [] },
              ],
            }
          : item
      );
    }
    return list.map((item) => {
      if (item.id === currentId) {
        return {
          ...item,
          children: addNestedChild(item.children, restPath),
        };
      }
      return item;
    });
  };

  const cloneItem = (path) => {
    setItems((prev) => cloneNestedItem(prev, path));
  };

  const cloneNestedItem = (list, path) => {
    const [currentId, ...restPath] = path;
    if (restPath.length === 0) {
        const itemToClone = list.find((item) => item.id === currentId);
        const clonedItem = {
            ...itemToClone,
            id: Date.now() + Math.random(), // Ensure unique id for the cloned item
            children: deepClone(itemToClone.children),
        };

        // Add the cloned item to the list
        return [
            ...list,
            clonedItem,
        ];
    }
    return list.map((item) => {
        if (item.id === currentId) {
            return {
                ...item,
                children: cloneNestedItem(item.children, restPath),
            };
        }
        return item;
    });
};

  const deepClone = (children) => {
    return children.map((child) => ({
      ...child,
      id: Date.now() + Math.random(),
      children: deepClone(child.children),
    }));
  };

  // Updated Select component for react-hook-form
  const Selectcm = forwardRef(({ onChange, name, value }, ref) => (
    <>
      <label>Status</label>
      <select
        className="cms-all-selector"
        name={name}
        value={value}
        ref={ref}
        onChange={onChange}
      >
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
    </>
  ));

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const renderList = (list, path = []) => {
    return (
        <>
            {list.map((item) => {
                const currentPath = [...path, item.id];
                const namePrefix = `level-${currentPath.length}-${item.id}`; // Ensure unique namePrefix using item.id
                return (
                    <div className="inputfielgridsinglewrp" key={item.id}>
                        <div className="inputfielgridsingle">
                            <div className="inputfieldwrap">
                                <label>Item Name<em>*</em></label>
                                <input
                                    className="inputfield"
                                    type="text"
                                    {...register(`${namePrefix}-name`)} // Use dynamic unique namePrefix
                                    defaultValue={item.name}
                                    onChange={(e) =>
                                        updateItem(currentPath, 'name', e.target.value)
                                    }
                                    placeholder="Name"
                                />
                            </div>
                            <div className="inputfieldwrap">
                                <label>Url</label>
                                <input
                                    className="inputfield"
                                    type="text"
                                    {...register(`${namePrefix}-urllink`)} // Use dynamic unique namePrefix
                                    defaultValue={item.urllink}
                                    onChange={(e) =>
                                        updateItem(currentPath, 'urllink', e.target.value)
                                    }
                                    placeholder="Url link"
                                />
                            </div>
                            <div className="inputfieldwrap">
                                <Selectcm
                                    value={item.status || ''}
                                    {...register(`${namePrefix}-status`)} // Use dynamic unique namePrefix
                                />
                            </div>
                            <div className="inputfieldwrapindex">
                                <label>Index</label>
                                <input
                                    className="inputfield"
                                    type="number"
                                    {...register(`${namePrefix}-indxno`)} // Use dynamic unique namePrefix
                                    defaultValue={item.indxno}
                                    onChange={(e) =>
                                        updateItem(currentPath, 'indxno', e.target.value)
                                    }
                                />
                            </div>
                            <div className="inputfieldwrapend">
                                <label>Actions</label>
                                <div className="action-contain">
                                    <span
                                        onClick={() => deleteItem(currentPath)}
                                        className="fa fa-trash-o"
                                        title="delete"
                                    ></span>
                                    <span
                                        onClick={() => cloneItem(currentPath)}
                                        className="fa fa-copy"
                                        title="clone"
                                    ></span>
                                    {path.length < 2 && (
                                        <span
                                            onClick={() => addChild(currentPath)}
                                            className="fa fa-plus"
                                            title="add child"
                                        ></span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {item.children.length > 0 && renderList(item.children, currentPath)}
                    </div>
                );
            })}
        </>
    );
};

  return (
    <div>
      <div className="custom-container">
        <div className="custom-row">
          <div className="custom-col-12">
            <div className="custom-section-title">
              <h4>Add Menu</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-fullform-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="formbithout-sectionm">
          <div className="formbithout-section">
            {renderList(items)}
          </div>
          <div className="buttonwrape">
            <button type="submit" className="buttonst">Submit Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DynamicForm;
