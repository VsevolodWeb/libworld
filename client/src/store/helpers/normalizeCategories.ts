import {CategoryOutputType} from '../categories-reducer'

export default (list: CategoryOutputType[]) => list.map((category, categoryIndex, array) => {
    if (!category.parentId) return category

    array.forEach((item, index, array) => {
        if (item._id === category.parentId) {
            const element = array[index]


            element['subcategories'] = [category]

            array.push(element)

            return
        }
    })

    return false
}).filter(item => item !== false) as CategoryOutputType[]