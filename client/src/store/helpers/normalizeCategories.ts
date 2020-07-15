import {CategoryOutputType} from '../categories-reducer'

export default (list: CategoryOutputType[]) => list.map((category, categoryIndex, array) => {
    if (!category.parentId) return category

    array.forEach((item) => {
        if (item._id === category.parentId) {
            if (!item.subcategories) {
                item.subcategories = [category]
            } else {
                item.subcategories = [...item.subcategories, category]
            }
        }
    })

    return false
}).filter(item => item !== false) as CategoryOutputType[]