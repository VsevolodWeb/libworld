const categoriesWithSubcategories = (list) => list.map((category, categoryIndex, array) => {
    if (!category.parentId) return category

    array.forEach((item, index, array) => {
        if (item._id === category.parentId) {
            const element = array[index]

            element['subcategories'] = [category]

            return array.push(element)
        }
    })

    return false
}).filter(item => item !== false)

export default categoriesWithSubcategories