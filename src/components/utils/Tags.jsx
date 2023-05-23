import React, { useEffect, useState } from "react";
import Tagify from "@yaireo/tagify";

const Tags = (props) => {
    let options = {
        name: "tags",
        id: "input_tags",
        value: "",
        placeholder: "",
        onChange: () => { },
    };
    options = { ...options, ...props }

    const handleChange = async (e) => {
        let dts = e.target.value;
        if (!options.value)
            await tagify()
        try {
            document.getElementById("tags_value").value = JSON.parse(dts)
                .map((dt) => dt.value)
                .join(",");
        } catch (error) {
            document.getElementById("tags_value").value = dts;
        }
    };

    const tagify = async () => {
        const t = document.querySelector("#" + options.id);
        t && new Tagify(t);
    }

    useEffect(() => {
        if (options.value)
            tagify()
    }, [options.value]);

    return (
        <>
            <input
                type="text"
                placeholder={options.placeholder}
                id={options.id}
                defaultValue={props.value}
                className="form-control mb-2"
                onAddTag={(e) => {
                    console.log(e);
                    handleChange(e);
                }}
            />

            <input
                id="tags_value"
                type="hidden"
                name={options.name}
                defaultValue={props.value}
                onChange={(e) => {
                    options.onChange(e);
                }}
            />
        </>
    );
};

export default Tags;
