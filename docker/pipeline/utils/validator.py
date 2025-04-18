def normalize_modes(modes: dict) -> dict:
    """
    Chuẩn hóa tất cả mode value về dạng list of [low, high].
    Nếu mode có value là [low, high] → chuyển thành [[low, high]].
    Nếu đã là list of list → giữ nguyên.
    """
    normalized = {}

    for mode, ranges in modes.items():
        if isinstance(ranges[0], (int, float)):  # dạng [low, high]
            normalized[mode] = [ranges]
        elif isinstance(ranges[0], list):        # dạng [[low, high], ...]
            normalized[mode] = ranges
        else:
            raise ValueError(f"Invalid mode format for '{mode}': {ranges}")

    return normalized


def validate_mode_ranges(modes: dict):
    """
    Kiểm tra các mode đã normalize có đúng cấu trúc và logic không.
    - Phải là list of list [low, high]
    - low < high
    """
    for mode, ranges in modes.items():
        for r in ranges:
            if not isinstance(r, list) or len(r) != 2:
                raise ValueError(f"Invalid range format in mode '{mode}': {r}")
            if r[0] >= r[1]:
                raise ValueError(f"Invalid range (low >= high) in mode '{mode}': {r}")


def process_modes(modes: dict) -> dict:
    """
    Gộp normalize + validate.
    """
    if modes:
        normalized = normalize_modes(modes)
        validate_mode_ranges(normalized)
        return normalized
    return None
