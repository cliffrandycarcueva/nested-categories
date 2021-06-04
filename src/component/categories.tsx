import React, { useMemo, useState } from "react";
import { mockData } from "../data";

interface interfaceChild {
  name: string;
  categories: any[];
}

const Category: React.FC<any> = () => {
  const [children, setChildren] = useState<interfaceChild>(mockData);

  const childrenData: interfaceChild = useMemo(() => {
    return { ...children };
  }, [children]);

  const addChild = (child: any, name: string) => {
    if (name === "root") {
      const newChild = {
        name: `${children.categories.length + 1}`,
        categories: [],
      };

      setChildren({
        ...children,
        categories: [...children.categories, newChild],
      });
    } else {
      const newChild = {
        name: `${name}.${child.length + 1}`,
        categories: [],
      };
      const record = [...child, newChild];

      children.categories.forEach(update(name, record));
      setChildren({ ...children });
    }
  };

  const update = (name: string, categories: any) => (obj: any) => {
    if (obj.name === name) {
      obj.categories = categories;
      return true;
    } else if (obj.categories)
      return obj.categories.some(update(name, categories));
  };

  const renderChild = (category: interfaceChild[]) => {
    return category.map((child: interfaceChild) => {
      return (
        <div className="child-border" key={child.name}>
          Name: {child.name}
          <button
            className="add-button"
            onClick={() => addChild(child.categories, child.name)}
          >
            +
          </button>
          {child.categories.length > 0 ? renderChild(child.categories) : null}
        </div>
      );
    });
  };

  return (
    <>
      <div className="child-border" style={{ width: "50%" }}>
        Name: {childrenData.name}
        <button
          className="add-button"
          onClick={() => addChild(childrenData.categories, childrenData.name)}
        >
          +
        </button>
        {renderChild(childrenData.categories)}
      </div>
    </>
  );
};

export default Category;
