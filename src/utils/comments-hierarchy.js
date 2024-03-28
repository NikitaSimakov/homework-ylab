export const sortCommentsByHierarchy = (comments) => {
  // Создаем объект для хранения комментариев по их id
  const commentsMap = new Map();

  // Функция для добавления комментария в карту
  const addCommentToMap = (comment) => {
    commentsMap.set(comment._id, comment);
    // Если у комментария есть дочерние комментарии, добавляем их рекурсивно в карту
    if (comment.children) {
      comment.children.forEach(addCommentToMap);
    }
  };

  // Добавляем каждый комментарий в карту
  comments.forEach(addCommentToMap);

  // Функция для построения иерархии комментариев
  const buildCommentHierarchy = (comment) => {
    const parent = comment.parent;
    if (parent && parent._id && commentsMap.has(parent._id)) {
      const parentComment = commentsMap.get(parent._id);
      if (!parentComment.children) {
        parentComment.children = [];
      }
      parentComment.children.push(comment);
    }
  };

  // Строим иерархию комментариев
  comments.forEach(buildCommentHierarchy);

  // Фильтруем комментарии, оставляя только корневые (без родительских)
  const rootComments = comments.filter(comment => !comment.parent || comment.parent._type === 'article');

  return rootComments;
};
